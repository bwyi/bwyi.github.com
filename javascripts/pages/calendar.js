/* Extracted from calendar.html — block 1. */
const calendarState = {
  weekStart: startOfWeek(new Date())
};

const availabilityTitles = new Set(["Busy", "Tentative", "Working elsewhere", "Out of office"]);
const dayNames = {
  en: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  fr: ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"]
};
const startHour = 0;
const endHour = 24;
const hourPixelHeight = 34;

function parseEventDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfWeek(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatHour(hour) {
  if (document.documentElement.lang === "fr") return `${hour} h`;
  if (hour === 0) return "12 AM";
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display} ${suffix}`;
}

function minutesSinceStart(date) {
  return (date.getHours() - startHour) * 60 + date.getMinutes();
}

function buildWeekEvents(events) {
  const weekEnd = addDays(calendarState.weekStart, 7);
  const parsedEvents = events
    .filter(event => availabilityTitles.has(event.title))
    .map(event => ({
      ...event,
      startDate: parseEventDate(event.start),
      endDate: parseEventDate(event.end)
    }))
    .filter(event => event.startDate && event.endDate)
    .filter(event => event.endDate > calendarState.weekStart && event.startDate < weekEnd);

  return parsedEvents.flatMap(event => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const dayStart = addDays(calendarState.weekStart, dayIndex);
      const dayEnd = addDays(dayStart, 1);
      const startDate = event.startDate > dayStart ? event.startDate : dayStart;
      const endDate = event.endDate < dayEnd ? event.endDate : dayEnd;

      if (endDate <= startDate) return null;
      return {
        ...event,
        dayIndex,
        startDate,
        endDate
      };
    }).filter(Boolean);
  });
}

function renderCalendar(events) {
  const status = document.getElementById("calendar-status");
  const week = document.getElementById("calendar-week");
  const title = document.getElementById("calendar-title");
  const timezone = document.getElementById("calendar-timezone");
  const today = new Date();
  const weekEvents = buildWeekEvents(events);
  const language = document.documentElement.lang === "fr" ? "fr" : "en";
  const monthLabel = calendarState.weekStart.toLocaleDateString(language === "fr" ? "fr-CA" : "en-CA", {
    month: "short",
    year: "numeric"
  });

  title.textContent = monthLabel;
  timezone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || (language === "fr" ? "Heure locale" : "Local time");
  status.textContent = "";

  const viewingCurrentWeek = sameDay(calendarState.weekStart, startOfWeek(today));
  document.getElementById("calendar-today").classList.toggle("is-current-week", viewingCurrentWeek);

  const dayHeader = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(calendarState.weekStart, index);
    const stateClasses = [
      sameDay(day, today) ? "is-today" : "",
      index === 0 || index === 6 ? "is-weekend" : ""
    ].filter(Boolean).join(" ");
    return `
      <div class="calendar-day-header${stateClasses ? ` ${stateClasses}` : ""}">
        <span>${dayNames[language][index]}</span>
        <strong>${day.getDate()}</strong>
      </div>
    `;
  }).join("");

  const hourRows = Array.from({ length: endHour - startHour }, (_, index) => {
    const hour = startHour + index;
    return `<div class="calendar-hour-label" style="grid-row:${index + 2};">${formatHour(hour)}</div>`;
  }).join("");

  const dayCells = Array.from({ length: 7 }, (_, dayIndex) => {
    const day = addDays(calendarState.weekStart, dayIndex);
    const stateClasses = [
      sameDay(day, today) ? "is-today" : "",
      dayIndex === 0 || dayIndex === 6 ? "is-weekend" : ""
    ].filter(Boolean).join(" ");
    return `<div class="calendar-day-column${stateClasses ? ` ${stateClasses}` : ""}" style="grid-column:${dayIndex + 2};"></div>`;
  }).join("");

  const nowLine = viewingCurrentWeek && today.getHours() >= startHour && today.getHours() < endHour
    ? `<div class="calendar-now-line" aria-hidden="true" style="grid-column:${today.getDay() + 2}; top:${Math.round(minutesSinceStart(today) * hourPixelHeight / 60)}px;"><span>${language === "fr" ? "MAINTENANT" : "NOW"}</span></div>`
    : "";

  const eventBlocks = weekEvents.map(event => {
    const dayIndex = event.dayIndex;
    const topMinutes = Math.max(0, minutesSinceStart(event.startDate));
    const bottomMinutes = Math.min((endHour - startHour) * 60, minutesSinceStart(event.endDate));
    const top = Math.round(topMinutes * hourPixelHeight / 60);
    const bottom = Math.round(bottomMinutes * hourPixelHeight / 60);
    const height = Math.max(8, bottom - top);
    const label = event.title === "Tentative"
      ? "Tentative"
      : (language === "fr" ? "Occupé" : "Busy");
    return `
      <div class="calendar-busy-block ${event.title === "Tentative" ? "is-tentative" : ""}"
           style="grid-column:${dayIndex + 2} / span 1; top:${top}px; height:${height}px;"
           title="${label}">
        <span>${label}</span>
      </div>
    `;
  }).join("");

  week.innerHTML = `
    <div class="calendar-corner"></div>
    ${dayHeader}
    <div class="calendar-grid-body">
      ${hourRows}
      ${dayCells}
      ${nowLine}
      ${eventBlocks}
    </div>
  `;

  if (!weekEvents.length) {
    status.textContent = "";
  }
}

function loadCalendarEvents() {
  if (window.location.protocol === "file:" && Array.isArray(window.CALENDAR_EVENTS)) {
    renderCalendar(window.CALENDAR_EVENTS);
    return;
  }

  fetch(`calendar-events.json?v=${Date.now()}`, { cache: "no-store" })
    .then(response => {
      if (!response.ok) throw new Error("Calendar data unavailable");
      return response.json();
    })
    .then(renderCalendar)
    .catch(() => {
      document.getElementById("calendar-status").textContent =
        document.documentElement.lang === "fr"
          ? "Les données du calendrier ne sont pas encore disponibles."
          : "Calendar data is not available yet.";
    });
}

document.getElementById("calendar-prev").addEventListener("click", () => {
  calendarState.weekStart = addDays(calendarState.weekStart, -7);
  loadCalendarEvents();
});

document.getElementById("calendar-next").addEventListener("click", () => {
  calendarState.weekStart = addDays(calendarState.weekStart, 7);
  loadCalendarEvents();
});

document.getElementById("calendar-today").addEventListener("click", () => {
  calendarState.weekStart = startOfWeek(new Date());
  loadCalendarEvents();
});

document.addEventListener("site-language-change", () => {
  loadCalendarEvents();
});

loadCalendarEvents();
