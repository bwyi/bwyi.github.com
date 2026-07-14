#!/usr/bin/env python3
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "calendar-events.json"
OUT_JS = ROOT / "calendar-events.js"

ICS_URLS = [
    "https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/e49dec2b-b09b-4a2e-8923-ca2d34f58445/cid-5DD438F7A538E2FB/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/fc7ed4d523b94f91ba7eaa4440f26b6811527342032614783165/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/5e70f5515e864314b263faeeaacc14d13843296798474635261/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/62da80c058fa441c9b5f01d30975a7902719377031557999369/calendar.ics",
    "https://outlook.office365.com/owa/calendar/782154d712654b2e8586daed1ba62e73@polymtl.ca/3874e909f1034aed9904feb229beabe17649506517277410763/calendar.ics",
]


def unfold_ics(text):
    lines = text.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    unfolded = []
    for line in lines:
        if line.startswith((" ", "\t")) and unfolded:
            unfolded[-1] += line[1:]
        else:
            unfolded.append(line)
    return unfolded


def clean_text(value):
    return (
        value.replace("\\n", " ")
        .replace("\\,", ",")
        .replace("\\;", ";")
        .replace("\\\\", "\\")
        .strip()
    )


def field_name(line):
    head = line.split(":", 1)[0]
    return head.split(";", 1)[0].upper()


def field_value(line):
    return line.split(":", 1)[1] if ":" in line else ""


def parse_datetime(value):
    value = value.strip()
    if not value:
        return ""
    if re.fullmatch(r"\d{8}", value):
        return f"{value[:4]}-{value[4:6]}-{value[6:8]}"
    if value.endswith("Z"):
        try:
            dt = datetime.strptime(value, "%Y%m%dT%H%M%SZ").replace(tzinfo=timezone.utc)
            return dt.isoformat().replace("+00:00", "Z")
        except ValueError:
            return value
    try:
        dt = datetime.strptime(value[:15], "%Y%m%dT%H%M%S")
        return dt.isoformat()
    except ValueError:
        return value


def parse_events(ics_text):
    events = []
    current = None
    for line in unfold_ics(ics_text):
        if line == "BEGIN:VEVENT":
            current = {}
            continue
        if line == "END:VEVENT" and current is not None:
            events.append(current)
            current = None
            continue
        if current is None or ":" not in line:
            continue

        name = field_name(line)
        value = clean_text(field_value(line))
        if name == "SUMMARY":
            current["title"] = value
        elif name == "DTSTART":
            current["start"] = parse_datetime(value)
        elif name == "DTEND":
            current["end"] = parse_datetime(value)
        elif name == "LOCATION":
            current["location"] = value
        elif name == "DESCRIPTION":
            current["description"] = value

    events = [event for event in events if event.get("title") and event.get("start")]
    events.sort(key=lambda event: event.get("start", ""))
    return events


def fetch_ics(url):
    req = Request(url, headers={"User-Agent": "BowenYiHomepageCalendar/1.0"})
    with urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def dedupe_events(events):
    seen = set()
    unique = []
    for event in sorted(events, key=lambda item: (item.get("start", ""), item.get("end", ""), item.get("title", ""))):
        key = (
            event.get("title", ""),
            event.get("start", ""),
            event.get("end", ""),
            event.get("location", ""),
        )
        if key in seen:
            continue
        seen.add(key)
        unique.append(event)
    return unique


def main():
    events = []
    for url in ICS_URLS:
        print(f"Fetching {url}")
        events.extend(parse_events(fetch_ics(url)))

    events = dedupe_events(events)
    json_text = json.dumps(events, ensure_ascii=False, indent=2)
    OUT.write_text(json_text + "\n", encoding="utf-8")
    OUT_JS.write_text("window.CALENDAR_EVENTS = " + json_text + ";\n", encoding="utf-8")
    print(f"Wrote {len(events)} events to {OUT} and {OUT_JS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
