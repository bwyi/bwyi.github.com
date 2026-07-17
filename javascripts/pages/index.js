/* Extracted from index.html — block 1. */
document.addEventListener("DOMContentLoaded", function () {
  const french = {
    "nav.label": "Navigation principale",
    "nav.home": "Accueil",
    "nav.research": "Recherche",
    "nav.overview": "Vue d’ensemble",
    "nav.publications": "Publications",
    "nav.people": "Équipe",
    "nav.positions": "Postes",
    "nav.teaching": "Enseignement",
    "nav.other": "Autres",
    "nav.calendar": "Calendrier",
    "nav.awards": "Prix",
    "nav.misc": "Divers",
    "profile.title": "Professeur adjoint",
    "profile.department": "Département de génie électrique",
    "about.title": "À propos",
    "about.focus": "Mes travaux portent sur <strong>l’estimation, l’apprentissage et la commande des systèmes dynamiques non linéaires</strong>, avec des applications en <strong>robotique et dans les systèmes autonomes</strong>. Je suis membre du <a href=\"https://www.gerad.ca\" target=\"_blank\">GERAD</a> et affilié au <a href=\"https://navigator.innovation.ca/fr/facility/polytechnique-montreal/laboratoire-de-robotique-mobile-et-de-systemes-autonomes\" target=\"_blank\">Laboratoire de robotique mobile et de systèmes autonomes</a>.",
    "about.background": "J’ai obtenu mon doctorat de la <a href=\"https://www.sjtu.edu.cn/\">Shanghai Jiao Tong University</a> en 2019. Avant de me joindre à Polytechnique Montréal, j’ai occupé des postes de recherche au CNRS–CentraleSupélec (France), à l’Australian Centre for Robotics de l’University of Sydney et au Robotics Institute de l’University of Technology Sydney (Australie).",
    "about.awards": "J’ai reçu le <strong>prix du meilleur article étudiant de l’IEEE CCTA</strong> (IEEE Control Systems Society, 2019) ainsi que la <strong>Discovery Early Career Researcher Award (DECRA)</strong> de l’Australian Research Council en 2024.",
    "themes.title": "Thèmes de recherche",
    "themes.control.title": "Commande non linéaire",
    "themes.control.text": "Conception de lois de commande fiables pour des systèmes dynamiques complexes et incertains.",
    "themes.robotics.title": "Robotique",
    "themes.robotics.text": "Méthodes d’estimation et de commande pour les systèmes robotiques autonomes et mobiles.",
    "themes.learning.title": "Apprentissage et estimation",
    "themes.learning.text": "Méthodes fondées sur les données mettant l’accent sur la stabilité, la structure et les garanties.",
    "news.title": "Actualités récentes",
    "footer.rights": "Bowen Yi. Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité"
  };

  const frenchNews = [
    ["20 juin 2026", "Félicitations à Jonathan et Chau Xin, qui ont obtenu des bourses SEED d’Affaires mondiales Canada! Ils se joindront à notre laboratoire pour des stages de recherche de huit mois."],
    ["18 juin 2026", "Le professeur Ti-Chung Lee de la National Sun Yat-sen University (Taïwan) et le professeur agrégé Han Zhang de la Shanghai Jiao Tong University visitent notre groupe cet été. Un enregistrement du séminaire est disponible ici : <a href=\"https://www.youtube.com/watch?v=FUUYoL-X-WM\" target=\"_blank\">[lien]</a>."],
    ["30 avr. 2026", "Nous remercions le Fonds de recherche du Québec pour son soutien dans le cadre du programme <em>Établissement de la relève professorale</em>. Ce financement contribuera à faire progresser nos recherches sur l’apprentissage et la commande fiables."],
    ["29 avr. 2026", "Félicitations à Haihui pour avoir réussi son examen de synthèse!"],
    ["28 avr. 2026", "Notre article sur la modélisation, la rigidification et la commande des robots continus a été accepté comme article complet dans <em>IEEE Transactions on Control Systems Technology</em>."],
    ["23 avr. 2026", "Nous remercions Affaires mondiales Canada pour son soutien à notre programme PMECP, qui vise à établir et à renforcer la collaboration entre Polytechnique et l’ITAM, au Mexique."],
    ["2 avr. 2026", "Le professeur Romeo Ortega (ITAM, Mexique) a visité notre groupe et présenté une conférence : <a href=\"https://www.youtube.com/watch?v=QBVTvw8uW_w&t=1186s\" target=\"_blank\">[lien]</a>."],
    ["5 mars 2026", "Deux articles sur la commande fondée sur les données ont été acceptés à l’European Control Conference 2026 (ECC). Félicitations à Haihui!"],
    ["1er mars 2026", "Notre article sur l’apprentissage de Koopman a été accepté comme article complet dans <em>Automatica</em>."],
    ["2 févr. 2026", "Le professeur Ti-Chung Lee (National Sun Yat-sen University, Taïwan) a visité notre groupe."],
    ["21 déc. 2025", "J’enseignerai ELE6209A – Systèmes de navigation en français pour la première fois à l’hiver 2026. Le cours est ouvert aux étudiants de premier cycle et des cycles supérieurs qui s’intéressent aux systèmes de navigation. <a href=\"https://www.polymtl.ca/programmes/cours/systemes-de-navigation\" target=\"_blank\">[Cours]</a>"],
    ["20 déc. 2025", "Bienvenue à Jeremy Meyer (codirigé avec J. Le Ny) et à Sofiane Faidi dans notre groupe."],
    ["2 juill. 2025", "Participation au 15e symposium IFAC ALCOS 2025 à Mexico."],
    ["17 janv. 2025", "Notre article, <em>A high performance globally exponentially convergent sensorless observer for the IPMSM</em>, a été accepté dans <em>Automatica</em>."],
    ["15 janv. 2025", "Notre article, <em>Adaptive state observers for a class of nonlinear systems</em>, a été accepté dans <em>Systems &amp; Control Letters</em>."],
    ["18 sept. 2024", "Notre article sur la préintégration des mesures inertielles a été accepté dans <em>Systems &amp; Control Letters</em>."],
    ["14 sept. 2024", "Notre article, <em>PEBO-SLAM: Observer design for visual inertial SLAM with convergence guarantees</em>, a été accepté comme article complet dans <em>IEEE Transactions on Automatic Control</em>."],
    ["13 sept. 2024", "Notre article sur la commande de position et de rigidité des robots continus actionnés par tendons a été accepté comme article régulier dans <em>IEEE Transactions on Automation Science and Engineering</em>."]
  ];

  const textNodes = document.querySelectorAll("[data-i18n]");
  const htmlNodes = document.querySelectorAll("[data-i18n-html]");
  const ariaNodes = document.querySelectorAll("[data-i18n-aria]");
  const newsItems = document.querySelectorAll(".news-timeline .news-item");
  const researchThemeLinks = document.querySelectorAll(".research-theme[data-research-target]");
  const maxItems = 5;
  let currentLanguage = "en";
  let expanded = false;
  let toggleButton = null;

  textNodes.forEach(function (node) {
    node.dataset.englishText = node.textContent;
  });
  htmlNodes.forEach(function (node) {
    node.dataset.englishHtml = node.innerHTML;
  });
  ariaNodes.forEach(function (node) {
    node.dataset.englishAria = node.getAttribute("aria-label") || "";
  });
  newsItems.forEach(function (item) {
    const date = item.querySelector(".news-date");
    const content = item.querySelector(".news-content");
    date.dataset.englishText = date.textContent;
    content.dataset.englishHtml = content.innerHTML;
  });

  function updateToggleText() {
    if (!toggleButton) return;
    if (currentLanguage === "fr") {
      toggleButton.textContent = expanded ? "Afficher moins" : "Afficher plus";
      toggleButton.setAttribute("aria-label", expanded ? "Afficher moins d’actualités" : "Afficher plus d’actualités");
    } else {
      toggleButton.textContent = expanded ? "Show less" : "Show more";
      toggleButton.setAttribute("aria-label", expanded ? "Show fewer news items" : "Show more news items");
    }
  }

  function applyLanguage(language, updateAddress) {
    currentLanguage = language === "fr" ? "fr" : "en";
    document.documentElement.lang = currentLanguage;
    document.title = currentLanguage === "fr" ? "Bowen Yi | Accueil" : "Bowen Yi";

    textNodes.forEach(function (node) {
      const key = node.dataset.i18n;
      node.textContent = currentLanguage === "fr" && french[key] ? french[key] : node.dataset.englishText;
    });
    htmlNodes.forEach(function (node) {
      const key = node.dataset.i18nHtml;
      node.innerHTML = currentLanguage === "fr" && french[key] ? french[key] : node.dataset.englishHtml;
    });
    ariaNodes.forEach(function (node) {
      const key = node.dataset.i18nAria;
      node.setAttribute("aria-label", currentLanguage === "fr" && french[key] ? french[key] : node.dataset.englishAria);
    });
    newsItems.forEach(function (item, index) {
      const date = item.querySelector(".news-date");
      const content = item.querySelector(".news-content");
      if (currentLanguage === "fr" && frenchNews[index]) {
        date.textContent = frenchNews[index][0];
        content.innerHTML = frenchNews[index][1];
      } else {
        date.textContent = date.dataset.englishText;
        content.innerHTML = content.dataset.englishHtml;
      }
    });

    document.querySelectorAll("[data-language]").forEach(function (button) {
      const selected = button.dataset.language === currentLanguage;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    researchThemeLinks.forEach(function (link) {
      const target = link.dataset.researchTarget;
      link.href = currentLanguage === "fr"
        ? "research.html?lang=fr#" + target
        : "research.html#" + target;
    });
    updateToggleText();

    try {
      localStorage.setItem("bowen-site-language", currentLanguage);
    } catch (error) {
      // Language switching still works when storage is unavailable.
    }

    if (updateAddress) {
      try {
        const url = new URL(window.location.href);
        if (currentLanguage === "fr") {
          url.searchParams.set("lang", "fr");
        } else {
          url.searchParams.delete("lang");
        }
        history.replaceState(null, "", url.href);
      } catch (error) {
        // Some local file viewers do not allow history updates.
      }
    }
  }

  if (newsItems.length > maxItems) {
    newsItems.forEach(function (item, index) {
      if (index >= maxItems) item.style.display = "none";
    });

    toggleButton = document.createElement("button");
    toggleButton.className = "news-toggle";
    toggleButton.type = "button";
    toggleButton.addEventListener("click", function () {
      expanded = !expanded;
      newsItems.forEach(function (item, index) {
        if (index >= maxItems) item.style.display = expanded ? "block" : "none";
      });
      updateToggleText();
    });
    document.querySelector(".news-timeline").after(toggleButton);
  }

  document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.dataset.language, true);
    });
  });

  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  let savedLanguage = "";
  try {
    savedLanguage = localStorage.getItem("bowen-site-language") || "";
  } catch (error) {
    savedLanguage = "";
  }
  applyLanguage(requestedLanguage === "fr" || requestedLanguage === "en" ? requestedLanguage : savedLanguage, false);
});
