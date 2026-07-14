(function () {
  "use strict";

  var root = document.querySelector("[data-bilingual-root]");
  if (!root) return;

  var navFrench = {
    "index.html": "Accueil",
    "research.html": "Aperçu",
    "publication.html": "Publications",
    "people.html": "Équipe",
    "position.html": "Postes",
    "calendar.html": "Calendrier",
    "awards.html": "Prix",
    "services.html": "Services",
    "misc.html": "Divers"
  };
  var headingFrench = ["Recherche", "Enseignement", "Autres"];
  var nav = document.querySelector(".site-nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav .nav-link"));
  var navHeadings = Array.prototype.slice.call(document.querySelectorAll(".site-nav .nav-heading"));
  var textNodes = Array.prototype.slice.call(document.querySelectorAll("[data-en][data-fr]"));
  var htmlNodes = Array.prototype.slice.call(document.querySelectorAll("[data-html-en][data-html-fr]"));
  var ariaNodes = Array.prototype.slice.call(document.querySelectorAll("[data-aria-en][data-aria-fr]"));

  navLinks.forEach(function (link) { link.dataset.languageEn = link.textContent; });
  navHeadings.forEach(function (heading) { heading.dataset.languageEn = heading.textContent; });

  var switcher = document.createElement("div");
  switcher.className = "page-language-switch";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Language selection");
  switcher.innerHTML = '<button type="button" data-page-language="en" aria-pressed="true">EN</button><span aria-hidden="true">|</span><button type="button" data-page-language="fr" aria-pressed="false">FR</button>';
  root.insertBefore(switcher, root.firstChild);

  var buttons = Array.prototype.slice.call(switcher.querySelectorAll("[data-page-language]"));

  function applyLanguage(language, updateUrl) {
    document.documentElement.lang = language;
    document.title = language === "fr"
      ? (document.documentElement.dataset.titleFr || document.title)
      : (document.documentElement.dataset.titleEn || document.title);

    if (nav) {
      nav.setAttribute("aria-label", language === "fr" ? "Navigation principale" : "Main navigation");
    }

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.textContent = language === "fr" && navFrench[href]
        ? navFrench[href]
        : link.dataset.languageEn;
    });

    navHeadings.forEach(function (heading, index) {
      heading.textContent = language === "fr" && headingFrench[index]
        ? headingFrench[index]
        : heading.dataset.languageEn;
    });

    textNodes.forEach(function (node) {
      node.textContent = language === "fr" ? node.dataset.fr : node.dataset.en;
    });

    htmlNodes.forEach(function (node) {
      node.innerHTML = language === "fr" ? node.dataset.htmlFr : node.dataset.htmlEn;
    });

    ariaNodes.forEach(function (node) {
      node.setAttribute("aria-label", language === "fr" ? node.dataset.ariaFr : node.dataset.ariaEn);
    });

    switcher.setAttribute("aria-label", language === "fr" ? "Sélection de la langue" : "Language selection");
    buttons.forEach(function (button) {
      var active = button.dataset.pageLanguage === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    try { localStorage.setItem("bowen-site-language", language); } catch (error) {}

    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (language === "fr") url.searchParams.set("lang", "fr");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }

    document.dispatchEvent(new CustomEvent("site-language-change", {
      detail: { language: language }
    }));
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.dataset.pageLanguage, true);
    });
  });

  var params = new URLSearchParams(window.location.search);
  var requested = params.get("lang");
  var saved = null;
  try { saved = localStorage.getItem("bowen-site-language"); } catch (error) {}
  applyLanguage(requested === "fr" || (!requested && saved === "fr") ? "fr" : "en", false);
}());
