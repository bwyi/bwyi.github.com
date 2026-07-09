#!/usr/bin/env python3
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "calendar-events.json"


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


def main():
    ics_url = os.environ.get("OUTLOOK_CALENDAR_ICS_URL")
    if not ics_url:
        print("OUTLOOK_CALENDAR_ICS_URL is not set", file=sys.stderr)
        return 1

    req = Request(ics_url, headers={"User-Agent": "BowenYiHomepageCalendar/1.0"})
    with urlopen(req, timeout=30) as response:
        ics_text = response.read().decode("utf-8", errors="replace")

    events = parse_events(ics_text)
    OUT.write_text(json.dumps(events, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(events)} events to {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
