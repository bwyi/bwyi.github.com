#!/usr/bin/env python3
"""Fetch public Outlook ICS feeds and publish privacy-safe availability data."""

import json
import os
import re
import sys
from datetime import date, datetime, time, timedelta
from pathlib import Path
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

from icalendar import Calendar
import recurring_ical_events


SCRIPT_PATH = Path(__file__).resolve()
DEFAULT_ROOT = SCRIPT_PATH.parents[1] if SCRIPT_PATH.parent.name == "scripts" else SCRIPT_PATH.parent
ROOT = Path(os.environ.get("CALENDAR_OUTPUT_DIR", DEFAULT_ROOT)).expanduser()
OUT = ROOT / "calendar-events.json"
OUT_JS = ROOT / "calendar-events.js"

CALENDAR_TIMEZONE = ZoneInfo(os.environ.get("CALENDAR_TIMEZONE", "America/Toronto"))
PAST_DAYS = int(os.environ.get("CALENDAR_PAST_DAYS", "1095"))
FUTURE_DAYS = int(os.environ.get("CALENDAR_FUTURE_DAYS", "730"))

DEFAULT_ICS_URLS = [
    "https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/e49dec2b-b09b-4a2e-8923-ca2d34f58445/cid-5DD438F7A538E2FB/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/fc7ed4d523b94f91ba7eaa4440f26b6811527342032614783165/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/5e70f5515e864314b263faeeaacc14d13843296798474635261/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/62da80c058fa441c9b5f01d30975a7902719377031557999369/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/3874e909f1034aed9904feb229beabe17649506517277410763/calendar.ics",
]

PUBLIC_AVAILABILITY_TITLES = {
    "busy": "Busy",
    "tentative": "Tentative",
    "working elsewhere": "Working elsewhere",
    "out of office": "Out of office",
    "free": "Free",
}


def calendar_urls():
    raw = os.environ.get("OUTLOOK_CALENDAR_ICS_URLS") or os.environ.get("OUTLOOK_CALENDAR_ICS_URL")
    if not raw:
        return DEFAULT_ICS_URLS
    return [url for url in re.split(r"[\s,]+", raw.strip()) if url]


def fetch_ics(url):
    request = Request(
        url,
        headers={
            "User-Agent": "BowenYiHomepageCalendar/2.0",
            "Cache-Control": "no-cache",
        },
    )
    with urlopen(request, timeout=30) as response:
        return response.read()


def as_datetime(value):
    """Return a timezone-aware datetime in the public calendar timezone."""
    if isinstance(value, datetime):
        if value.tzinfo is None:
            return value.replace(tzinfo=CALENDAR_TIMEZONE)
        return value.astimezone(CALENDAR_TIMEZONE)
    if isinstance(value, date):
        return datetime.combine(value, time.min, tzinfo=CALENDAR_TIMEZONE)
    return None


def decoded(component, name):
    if component.get(name) is None:
        return None
    try:
        return component.decoded(name)
    except (KeyError, ValueError, TypeError):
        return None


def privacy_safe_title(component):
    """Never publish private event subjects, even if a feed is misconfigured."""
    summary = str(component.get("SUMMARY", "Busy")).strip()
    known_title = PUBLIC_AVAILABILITY_TITLES.get(summary.casefold())
    if known_title:
        return known_title
    if str(component.get("TRANSP", "")).upper() == "TRANSPARENT":
        return "Free"
    return "Busy"


def event_range():
    now = datetime.now(CALENDAR_TIMEZONE)
    start = datetime.combine((now - timedelta(days=PAST_DAYS)).date(), time.min, tzinfo=CALENDAR_TIMEZONE)
    end = datetime.combine((now + timedelta(days=FUTURE_DAYS)).date(), time.max, tzinfo=CALENDAR_TIMEZONE)
    return start, end


def parse_events(ics_data, range_start, range_end):
    calendar = Calendar.from_ical(ics_data)
    components = recurring_ical_events.of(calendar).between(range_start, range_end)
    events = []

    for component in components:
        if str(component.get("STATUS", "")).upper() == "CANCELLED":
            continue

        start_value = decoded(component, "DTSTART")
        end_value = decoded(component, "DTEND")
        start = as_datetime(start_value)
        end = as_datetime(end_value)
        if start is None:
            continue
        if end is None:
            duration = decoded(component, "DURATION")
            if isinstance(duration, timedelta):
                end = start + duration
            elif isinstance(start_value, date) and not isinstance(start_value, datetime):
                end = start + timedelta(days=1)
            else:
                end = start
        if end <= start:
            continue

        events.append(
            {
                "title": privacy_safe_title(component),
                "start": start.isoformat(),
                "end": end.isoformat(),
            }
        )

    events.sort(key=lambda event: (event["start"], event["end"], event["title"]))
    return events


def dedupe_events(events):
    seen = set()
    unique = []
    for event in sorted(events, key=lambda item: (item["start"], item["end"], item["title"])):
        key = (event["title"], event["start"], event["end"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(event)
    return unique


def main():
    urls = calendar_urls()
    if not urls:
        print("No Outlook calendar ICS URLs configured", file=sys.stderr)
        return 1

    range_start, range_end = event_range()
    events = []
    for url in urls:
        print(f"Fetching {url}")
        events.extend(parse_events(fetch_ics(url), range_start, range_end))

    events = dedupe_events(events)
    ROOT.mkdir(parents=True, exist_ok=True)
    json_text = json.dumps(events, ensure_ascii=False, indent=2)
    OUT.write_text(json_text + "\n", encoding="utf-8")
    OUT_JS.write_text("window.CALENDAR_EVENTS = " + json_text + ";\n", encoding="utf-8")
    print(
        f"Wrote {len(events)} events from {range_start.date()} through {range_end.date()} "
        f"to {OUT} and {OUT_JS}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
