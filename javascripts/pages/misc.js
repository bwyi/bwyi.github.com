/* Extracted from misc.html — block 1. */
document.addEventListener("DOMContentLoaded", function () {
  function toggleLabel(button, expanded) {
    const french = document.documentElement.lang === "fr";
    const label = expanded
      ? (french ? "Afficher moins" : "Show less")
      : (french ? "Afficher plus" : "Show more");
    const icon = expanded ? "fa-chevron-up" : "fa-chevron-down";
    button.innerHTML = `<i class="fa ${icon}" aria-hidden="true"></i>${label}`;
  }

  function addContentToggle(listSelector, itemSelector, maxItems, buttonClass) {
    const list = document.querySelector(listSelector);
    if (!list) return;

    const items = list.querySelectorAll(itemSelector);
    if (items.length <= maxItems) return;

    items.forEach((item, index) => {
      item.hidden = index >= maxItems;
    });

    const button = document.createElement("button");
    button.type = "button";
    button.className = buttonClass;
    button.setAttribute("aria-expanded", "false");
    toggleLabel(button, false);

    button.addEventListener("click", function () {
      const nextExpanded = button.getAttribute("aria-expanded") !== "true";

      items.forEach((item, index) => {
        if (index >= maxItems) item.hidden = !nextExpanded;
      });

      button.setAttribute("aria-expanded", String(nextExpanded));
      toggleLabel(button, nextExpanded);
    });

    list.after(button);
  }

  addContentToggle(".seminar-list", ".seminar-record", 3, "seminar-toggle");
  addContentToggle(".tech-notes-list", ".zhihu-tech-card", 3, "tech-toggle");

  function updateSeminarDates() {
    const french = document.documentElement.lang === "fr";
    document.querySelectorAll(".seminar-date time[datetime]").forEach(time => {
      const date = new Date(`${time.getAttribute("datetime")}T12:00:00`);
      time.textContent = date.toLocaleDateString(french ? "fr-CA" : "en-CA", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    });
    document.querySelectorAll(".seminar-toggle, .tech-toggle").forEach(button => {
      toggleLabel(button, button.getAttribute("aria-expanded") === "true");
    });
  }

  document.addEventListener("site-language-change", updateSeminarDates);
  updateSeminarDates();
});
