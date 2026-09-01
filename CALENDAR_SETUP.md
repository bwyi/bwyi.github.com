# Outlook Calendar Setup

This site displays availability data from `calendar-events.json`.
Event details are intentionally hidden. The public page filters out `Free`
entries and displays only unavailable blocks such as `Busy`, `Tentative`,
`Working elsewhere`, and `Out of office`.

## 1. Publish your Outlook calendar

In Outlook on the web, publish your calendar and copy the public ICS subscription link.

Use the ICS link, not the HTML link. If you want to protect event details,
publish availability only.

## 2. Add the ICS links to GitHub Secrets

In the GitHub repository:

1. Open `Settings`.
2. Open `Secrets and variables` -> `Actions`.
3. Add a repository secret named `OUTLOOK_CALENDAR_ICS_URLS`.
4. Paste one or more Outlook ICS URLs as the secret value. Put each URL on its own line.

## 3. Run the workflow

Open `Actions` -> `Update Outlook calendar` -> `Run workflow`.

The workflow also runs automatically every six hours. It fetches the Outlook ICS feeds and writes the result to `calendar-events.json` and `calendar-events.js`.

Recurring meetings are expanded for the previous three years and the next two
years. Times are normalized to `America/Toronto`, including daylight-saving
changes. The generated files contain availability labels and times only; event
subjects, locations, and descriptions are never published.

## Local testing

Run this from the site folder:

```sh
python3 -m pip install --requirement requirements-calendar.txt
OUTLOOK_CALENDAR_ICS_URLS="https://... https://..." python3 -B scripts/fetch_outlook_calendar.py
```
