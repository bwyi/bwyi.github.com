(function () {
  "use strict";

  if (window.BowenSiteShell) return;

  var navigationGroups = [
    {
      en: "Research",
      fr: "Recherche",
      key: "nav.research",
      links: [
        ["research.html", "Overview", "Aperçu", "nav.overview"],
        ["publication.html", "Publications", "Publications", "nav.publications"],
        ["people.html", "People", "Équipe", "nav.people"],
        ["position.html", "Positions", "Postes", "nav.positions"]
      ]
    },
    {
      en: "Teaching",
      fr: "Enseignement",
      key: "nav.teaching",
      links: [
        ["course-ele6202.html", "ELE6202", "ELE6202", "nav.ele6202"],
        ["course-ele6214.html", "ELE6214", "ELE6214", "nav.ele6214"],
        ["course-ele6209a.html", "ELE6209A", "ELE6209A", "nav.ele6209a"],
        ["course-ele2200.html", "ELE2200", "ELE2200", "nav.ele2200"]
      ]
    },
    {
      en: "Other",
      fr: "Autres",
      key: "nav.other",
      links: [
        ["calendar.html", "Calendar", "Calendrier", "nav.calendar"],
        ["awards.html", "Award", "Prix", "nav.awards"],
        ["services.html", "Services", "Services", "nav.services"],
        ["misc.html", "Misc", "Divers", "nav.misc"]
      ]
    }
  ];

  function languageIsFrench() {
    return document.documentElement.lang.toLowerCase().indexOf("fr") === 0;
  }

  function navLink(link) {
    return '<a class="nav-link" href="' + link[0] + '"' +
      ' data-site-en="' + link[1] + '" data-site-fr="' + link[2] + '"' +
      ' data-i18n="' + link[3] + '">' + link[1] + '</a>';
  }

  function navigationMarkup() {
    return '<h1>Bowen Yi</h1>衣博文<br>' +
      '<nav class="site-nav" aria-label="Main navigation">' +
      '<a class="nav-link" href="index.html" data-site-en="Home" data-site-fr="Accueil" data-i18n="nav.home">Home</a>' +
      navigationGroups.map(function (group) {
        return '<div class="nav-group">' +
          '<div class="nav-heading" data-site-en="' + group.en + '" data-site-fr="' + group.fr + '" data-i18n="' + group.key + '">' + group.en + '</div>' +
          group.links.map(navLink).join("") +
          '</div>';
      }).join("") +
      '</nav>';
  }

  function updateActiveNavigation(header) {
    var current = window.location.pathname.split("/").pop() || "index.html";
    header.querySelectorAll(".site-nav a").forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === current);
    });
  }

  function updateMenuButton(header) {
    var navigation = header.querySelector(".site-nav");
    var button = header.querySelector(".mobile-nav-toggle");
    if (!navigation || !button) return;

    var open = navigation.classList.contains("is-open");
    var label = languageIsFrench()
      ? (open ? "Fermer" : "Menu")
      : (open ? "Close" : "Menu");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", label);
    button.innerHTML = '<i class="fa ' + (open ? "fa-times" : "fa-bars") + '" aria-hidden="true"></i> ' + label;
  }

  function initialiseMobileNavigation(header) {
    var navigation = header.querySelector(".site-nav");
    if (!navigation || header.querySelector(".mobile-nav-toggle")) return;

    navigation.id = navigation.id || "site-navigation";
    var button = document.createElement("button");
    button.className = "mobile-nav-toggle";
    button.type = "button";
    button.setAttribute("aria-controls", navigation.id);
    header.insertBefore(button, navigation);

    button.addEventListener("click", function () {
      navigation.classList.toggle("is-open");
      updateMenuButton(header);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a") && window.matchMedia("(max-width: 700px)").matches) {
        navigation.classList.remove("is-open");
        updateMenuButton(header);
      }
    });

    var mediaQuery = window.matchMedia("(max-width: 700px)");
    function resetDesktopNavigation(event) {
      if (!event.matches) {
        navigation.classList.remove("is-open");
        updateMenuButton(header);
      }
    }
    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", resetDesktopNavigation);
    else mediaQuery.addListener(resetDesktopNavigation);

    updateMenuButton(header);
  }

  function renderHeader() {
    var header = document.querySelector("[data-site-header]");
    if (!header || header.dataset.siteRendered === "true") return;
    header.innerHTML = navigationMarkup();
    header.dataset.siteRendered = "true";
    updateActiveNavigation(header);
    initialiseMobileNavigation(header);
  }

  function renderFooters() {
    document.querySelectorAll("[data-site-footer]").forEach(function (footer) {
      if (footer.dataset.siteRendered === "true") return;
      footer.innerHTML =
        '<span>© <span data-current-year></span> Bowen Yi. <span data-site-footer-rights>All rights reserved.</span></span>' +
        '<span class="footer-separator" aria-hidden="true">·</span>' +
        '<a href="privacy-policy.html" data-site-footer-privacy>Privacy Policy</a>';
      footer.dataset.siteRendered = "true";
    });
  }

  function updateLanguage() {
    var french = languageIsFrench();
    document.querySelectorAll("[data-site-en][data-site-fr]").forEach(function (node) {
      node.textContent = french ? node.dataset.siteFr : node.dataset.siteEn;
    });
    document.querySelectorAll(".site-nav").forEach(function (nav) {
      nav.setAttribute("aria-label", french ? "Navigation principale" : "Main navigation");
    });
    document.querySelectorAll("[data-site-footer-rights]").forEach(function (node) {
      node.textContent = french ? "Tous droits réservés." : "All rights reserved.";
    });
    document.querySelectorAll("[data-site-footer-privacy]").forEach(function (node) {
      node.textContent = french ? "Politique de confidentialité" : "Privacy Policy";
    });
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });
    var header = document.querySelector("[data-site-header]");
    if (header) updateMenuButton(header);
  }

  function finishShell() {
    renderHeader();
    renderFooters();
    updateLanguage();
  }

  window.BowenSiteShell = {
    renderHeader: renderHeader,
    renderFooters: renderFooters,
    updateLanguage: updateLanguage
  };

  renderHeader();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", finishShell);
  else finishShell();
  document.addEventListener("site-language-change", updateLanguage);
  new MutationObserver(updateLanguage).observe(document.documentElement, { attributeFilter: ["lang"] });
}());
