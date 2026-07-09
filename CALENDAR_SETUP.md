# Outlook Calendar Setup

This site displays calendar data from `calendar-events.json`.

## 1. Publish your Outlook calendar

In Outlook on the web, publish your calendar and copy the public ICS subscription link.

Use the ICS link, not the HTML link.

## 2. Add the ICS link to GitHub Secrets

In the GitHub repository:

1. Open `Settings`.
2. Open `Secrets and variables` -> `Actions`.
3. Add a repository secret named `OUTLOOK_CALENDAR_ICS_URL`.
4. Paste the Outlook ICS URL as the secret value.

## 3. Run the workflow

Open `Actions` -> `Update Outlook calendar` -> `Run workflow`.

The workflow also runs automatically every six hours. It fetches the Outlook ICS feed and writes the result to `calendar-events.json`.

## Local testing

Run this from the site folder:

```sh
OUTLOOK_CALENDAR_ICS_URL="https://..." python3 -B scripts/fetch_outlook_calendar.py
```
