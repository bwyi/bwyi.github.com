/* Extracted from position.html — block 1. */
document.addEventListener("DOMContentLoaded", function () {
  const french = {
    "language.selector": "Choix de la langue",
    "nav.label": "Navigation principale",
    "nav.home": "Accueil",
    "nav.research": "Recherche",
    "nav.overview": "Vue d’ensemble",
    "nav.people": "Équipe",
    "nav.positions": "Postes",
    "nav.teaching": "Enseignement",
    "nav.other": "Autres",
    "nav.calendar": "Calendrier",
    "nav.awards": "Prix",
    "nav.misc": "Divers",
    "hero.kicker": "Possibilités de recherche · Montréal",
    "hero.title": "Possibilités de recherche",
    "hero.intro": "Je souhaite collaborer avec des étudiants et des chercheurs motivés en <strong>commande, estimation, apprentissage et robotique</strong>. Le groupe valorise de solides bases théoriques, la clarté du raisonnement, l’autonomie intellectuelle et un intérêt réel pour des problèmes d’ingénierie pertinents.",
    "status.aria": "État du recrutement",
    "status.label": "Demandes générales bienvenues",
    "status.text": "Les futurs étudiants aux cycles supérieurs, les chercheurs postdoctoraux et les visiteurs de recherche sont invités à communiquer avec moi. Les postes financés dépendent des projets en cours et du financement disponible.",
    "status.updated": "Dernière mise à jour : juillet 2026",
    "opportunities.title": "Possibilités",
    "graduate.tag": "Recherche aux cycles supérieurs",
    "graduate.title": "Doctorat et maîtrise recherche (M.Sc.A.)",
    "graduate.text1": "J’examine régulièrement les candidatures solides aux programmes de recherche aux cycles supérieurs de Polytechnique Montréal. Les profils pertinents comprennent la commande des systèmes, les mathématiques appliquées, le génie électrique ou mécanique, la robotique et les domaines connexes.",
    "graduate.text2": "Les candidats doivent être à l’aise avec l’algèbre linéaire et le calcul différentiel et intégral. Une expérience en systèmes dynamiques, probabilités, optimisation, programmation ou robotique constitue un atout.",
    "postdoc.tag": "Selon le financement",
    "postdoc.title": "Chercheurs postdoctoraux",
    "postdoc.text": "Des postes postdoctoraux sont parfois disponibles, selon le financement des projets. Les candidats solides sont invités à communiquer avec moi suffisamment tôt afin de discuter de l’adéquation scientifique et des demandes de bourses externes.",
    "postdoc.funding": "Les programmes concurrentiels de financement postdoctoral au Canada et au Québec comprennent :",
    "funding.banting": "Programme antérieur; les candidatures ont été transférées au programme CPRA.",
    "funding.cpra": "Programme fédéral actuel, auparavant la bourse postdoctorale du CRSNG.",
    "funding.mitacs": "Modèle actuel, auparavant Mitacs Élévation.",
    "funding.frq": "Secteur Nature et technologies, auparavant FRQNT B3.",
    "funding.ivado": "Pour les recherches liées à une IA robuste, capable de raisonnement et responsable.",
    "funding.gerad": "Financement postdoctoral concurrentiel en codirection.",
    "visitors.tag": "Séjours de recherche",
    "visitors.title": "Étudiants visiteurs et stagiaires de recherche",
    "visitors.text": "J’accueille des étudiants visiteurs aux cycles supérieurs, des stagiaires de recherche au premier cycle et des visiteurs universitaires pour des séjours de courte ou de longue durée. Les visiteurs doivent normalement disposer d’un financement externe de leur établissement d’attache ou d’un programme de bourses.",
    "apply.title": "Comment postuler",
    "apply.emailTitle": "Commencez par un courriel concis",
    "apply.emailText": "Utilisez l’objet <strong>« Prospective PhD/MSc/Postdoc – Name – Intended start term »</strong> et expliquez brièvement en quoi votre formation et vos intérêts correspondent aux activités du groupe.",
    "apply.button": "Envoyer une candidature",
    "apply.item1": "Une description précise de vos intérêts de recherche et du programme ou poste souhaité.",
    "apply.item2": "Un court texte expliquant le lien entre votre parcours et les thèmes de recherche du groupe.",
    "apply.item3": "Votre CV et vos relevés de notes; des relevés non officiels suffisent pour la prise de contact initiale.",
    "apply.item4": "Des liens vers vos publications, prépublications, codes, mémoire, thèse ou projets pertinents, le cas échéant.",
    "apply.item5": "Le trimestre de début souhaité ainsi que vos projets de bourse ou de financement externe.",
    "admission.note": "L’admission officielle est gérée de façon centralisée par Polytechnique Montréal. Les candidats doivent satisfaire aux <a href=\"https://www.polymtl.ca/admission\" target=\"_blank\" rel=\"noopener\">conditions d’admission aux études supérieures</a> de l’Université. Les programmes de maîtrise recherche et de doctorat peuvent être réalisés en anglais; les exigences relatives aux cours et aux langues dépendent du programme choisi.",
    "official.title": "Renseignements officiels sur les études supérieures",
    "official.intro": "Voici un résumé concis des renseignements publiés par Polytechnique Montréal. Les candidats doivent consulter les pages officielles indiquées pour connaître les règles d’admission et les détails des programmes les plus récents.",
    "masters.title": "Maîtrise recherche (M.Sc.A.)",
    "masters.text": "Les deux tiers du programme sont consacrés à un projet de recherche et le dernier tiers à des cours liés au domaine de recherche. Les travaux sont réalisés sous la direction d’un directeur de recherche.",
    "degree.credits": "Crédits au total",
    "degree.semesters": "Trimestres à temps plein",
    "masters.aria": "15 crédits de cours et 30 crédits de recherche",
    "masters.legend": "15 crédits de cours · 30 crédits de recherche",
    "phd.title": "Doctorat (Ph.D.)",
    "phd.text": "Le programme de doctorat développe des connaissances avancées, la rigueur intellectuelle, la curiosité scientifique et la créativité grâce à des travaux menés sous la direction d’un directeur de recherche.",
    "phd.aria": "15 crédits de cours et 75 crédits de recherche",
    "phd.legend": "15 crédits de cours · 75 crédits de recherche",
    "direct.title": "Passage direct du baccalauréat au doctorat",
    "direct.text": "Ce cheminement permet aux candidats admissibles de commencer leurs études doctorales après un baccalauréat en génie, sans devoir d’abord terminer une maîtrise.",
    "direct.item1": "Baccalauréat en génie ou diplôme équivalent (BAC+5 ou Master 2 dans le système européen).",
    "direct.item2": "Moyenne cumulative minimale de 3,2/4,0.",
    "direct.item3": "Doctorat standard de 90 crédits, normalement réalisé en 8 à 11 trimestres.",
    "direct.link": "Consulter les renseignements officiels sur les programmes",
    "double.title": "Double diplôme",
    "double.text": "Polytechnique Montréal a conclu plusieurs ententes de double diplôme avec de grandes écoles d’ingénieurs. Si votre établissement d’attache est signataire de l’une de ces ententes, vous pourriez intégrer un programme de maîtrise à votre formation d’ingénieur et obtenir à la fois le diplôme d’ingénieur de votre établissement et une maîtrise de Polytechnique Montréal.",
    "double.link": "En savoir plus sur les doubles diplômes",
    "language.title": "Langue d’études et exigences linguistiques",
    "language.text1": "Polytechnique Montréal est une université francophone de calibre international. Une connaissance de base du français est recommandée afin de faciliter l’intégration universitaire et sociale. Les programmes de maîtrise recherche et de doctorat peuvent être réalisés en anglais, et les étudiants peuvent suivre des cours dans des universités anglophones partenaires de Montréal tout en poursuivant leurs travaux de recherche à Polytechnique.",
    "language.text2": "Les candidats doivent consulter la page officielle pour connaître les preuves de compétence linguistique acceptées, les exemptions et les exigences de français liées à l’obtention du diplôme.",
    "language.link": "Consulter les exigences linguistiques officielles",
    "footer.rights": "Bowen Yi. Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité"
  };

  const textNodes = document.querySelectorAll("[data-i18n]");
  const htmlNodes = document.querySelectorAll("[data-i18n-html]");
  const ariaNodes = document.querySelectorAll("[data-i18n-aria]");

  textNodes.forEach(function (node) {
    node.dataset.englishText = node.textContent;
  });
  htmlNodes.forEach(function (node) {
    node.dataset.englishHtml = node.innerHTML;
  });
  ariaNodes.forEach(function (node) {
    node.dataset.englishAria = node.getAttribute("aria-label") || "";
  });

  function applyLanguage(language, updateAddress) {
    const currentLanguage = language === "fr" ? "fr" : "en";
    document.documentElement.lang = currentLanguage;
    document.title = currentLanguage === "fr" ? "Possibilités de recherche | Bowen Yi" : "Open Positions | Bowen Yi";

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = currentLanguage === "fr"
        ? "Possibilités de recherche en commande, estimation, apprentissage et robotique avec Bowen Yi à Polytechnique Montréal."
        : "Research opportunities in control, estimation, learning, and robotics with Bowen Yi at Polytechnique Montréal.";
    }

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
    document.querySelectorAll("[data-language]").forEach(function (button) {
      const selected = button.dataset.language === currentLanguage;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

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
