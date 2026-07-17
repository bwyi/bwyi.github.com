/* Extracted from publication.html — block 1. */
function parseBibtex(text) {
  return text.split('@').slice(1).map(block => {
    const entry = { raw: "@" + block.trim() };
    entry.type = block.split('{')[0].trim().toLowerCase();

    const fieldRegex = /(\w+)\s*=\s*[{"]([\s\S]*?)[}"],?/g;
    let m;
    while ((m = fieldRegex.exec(block)) !== null) {
      entry[m[1].toLowerCase()] =
        m[2].replace(/\s+/g, ' ').trim();
    }
    return entry;
  });
}

function formatAuthors(authors) {
  return authors.split(" and ").map(a => {
    let first="", last="";
    if (a.includes(",")) {
      const p = a.split(",");
      last = p[0].trim();
      first = p[1].trim();
    } else {
      const p = a.trim().split(/\s+/);
      first = p.slice(0,-1).join(" ");
      last = p.slice(-1)[0];
    }
    const name = `${first[0]}. ${last}`;
    return /^B\.\s*Yi$/i.test(name)
      ? `<strong class="me">B. Yi</strong>`
      : name;
  }).join(", ");
}

function venue(e) {
  if (e.journal) return e.journal;
  if (e.booktitle) return e.booktitle;
  return "";
}

function arxivId(e) {
  const source = [e.eprint, e.arxiv, e.journal]
    .filter(Boolean)
    .join(" ");
  const match = source.match(/\b\d{4}\.\d{4,5}(?:v\d+)?\b/i);
  return match ? match[0] : "";
}

function publicationCategory(entry) {
  const isArxivPreprint = /arxiv\s+preprint/i.test(entry.journal || "");
  if (isArxivPreprint) return "preprint";
  if (entry.type === "article") return "journal";
  if (entry.type === "inproceedings") return "conference";
  return "preprint";
}

function publicationSearchText(entry) {
  return [
    entry.author,
    (entry.title || "").replace(/<[^>]+>/g, " "),
    venue(entry),
    entry.note,
    entry.year
  ].filter(Boolean).join(" ").toLowerCase();
}

function renderPublicationEntry(entry, category) {
  const id = arxivId(entry);
  const publicationVenue = category === "preprint"
    ? (id ? `arXiv:${id}` : (entry.note || entry.journal || "Preprint"))
    : `${venue(entry)}${entry.volume ? `, vol. ${entry.volume}` : ""}${entry.number ? `(${entry.number})` : ""}${entry.pages ? `, pp. ${entry.pages}` : ""}`;

  return `<li data-publication-index="${entry._index}">
    <div class="pub-citation">
      ${formatAuthors(entry.author || "")},
      <span class="pub-title">${entry.title}</span>,
      <span class="pub-venue">${publicationVenue}</span>.
    </div>
    <div class="pub-links">
      ${category === "preprint" && id ? `<a class="pub-tag" href="https://arxiv.org/abs/${id}" target="_blank" rel="noopener"><i class="ai ai-arxiv" aria-hidden="true"></i> arXiv</a>` : ""}
      ${entry.pdf ? `<a class="pub-tag" href="${entry.pdf}" target="_blank" rel="noopener"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF</a>` : ""}
      ${category !== "preprint" && entry.doi ? `<a class="pub-tag" href="https://doi.org/${entry.doi}" target="_blank" rel="noopener"><i class="ai ai-doi" aria-hidden="true"></i> DOI</a>` : ""}
      <button class="pub-tag bibtex-button" type="button" data-bibtex-index="${entry._index}"><i class="fa fa-quote-left" aria-hidden="true"></i> BibTeX</button>
    </div>
  </li>`;
}

function renderPublicationCategory(title, category, categoryEntries) {
  if (!categoryEntries.length) return "";

  const byYear = {};
  categoryEntries.forEach(entry => {
    const year = entry.year || "Unknown";
    (byYear[year] ||= []).push(entry);
  });

  let html = `<div class="pub-section" data-publication-category="${category}"><h3>${title}</h3>`;
  Object.keys(byYear).sort((a, b) => Number(b) - Number(a)).forEach(year => {
    html += `<div class="pub-year"><b>${year}</b></div><ul class="pub-list">`;
    byYear[year].forEach(entry => {
      html += renderPublicationEntry(entry, category);
    });
    html += "</ul>";
  });
  return html + "</div>";
}

const entries = parseBibtex(
  window.PUBLICATIONS_BIBTEX || ""
).map((entry, index) => ({ ...entry, _index: index }));

const publicationYears = [...new Set(entries.map(entry => entry.year).filter(Boolean))]
  .sort((a, b) => Number(b) - Number(a));

const publicationTranslations = {
  fr: {
    "nav.label": "Navigation principale",
    "nav.home": "Accueil",
    "nav.research": "Recherche",
    "nav.overview": "Aperçu",
    "nav.people": "Équipe",
    "nav.positions": "Postes",
    "nav.teaching": "Enseignement",
    "nav.other": "Autres",
    "nav.calendar": "Calendrier",
    "nav.awards": "Prix",
    "nav.misc": "Divers",
    "language.selector": "Sélection de la langue",
    "page.title": "Publications",
    "filters.label": "Filtres des publications",
    "filters.searchLabel": "Rechercher dans les publications",
    "filters.searchPlaceholder": "Titre, auteur, revue, conférence ou année",
    "filters.typeLabel": "Type de publication",
    "filters.all": "Toutes",
    "filters.preprints": "Prépublications",
    "filters.journals": "Revues",
    "filters.conferences": "Conférences",
    "filters.yearLabel": "Année de publication",
    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité"
  }
};

const publicationInterfaceText = {
  en: {
    allYears: "All years",
    summary: count => `${count} publication${count === 1 ? "" : "s"} shown`,
    empty: "No publications match the current filters."
  },
  fr: {
    allYears: "Toutes les années",
    summary: count => `${count} publication${count === 1 ? "" : "s"} affichée${count === 1 ? "" : "s"}`,
    empty: "Aucune publication ne correspond aux filtres sélectionnés."
  }
};

const publicationSectionTitles = {
  en: {
    preprints: "Preprints",
    journals: "Journal Papers",
    conferences: "Conference Papers"
  },
  fr: {
    preprints: "Prépublications",
    journals: "Articles de revue",
    conferences: "Articles de conférence"
  }
};

const publicationTextNodes = Array.from(document.querySelectorAll("[data-i18n]"));
const publicationAriaNodes = Array.from(document.querySelectorAll("[data-i18n-aria]"));
const publicationPlaceholderNodes = Array.from(document.querySelectorAll("[data-i18n-placeholder]"));
const publicationLanguageButtons = Array.from(document.querySelectorAll("[data-language]"));
const publicationTypeButtons = Array.from(document.querySelectorAll("[data-publication-type]"));
const publicationSearch = document.getElementById("publication-search");
const publicationYear = document.getElementById("publication-year");
const publicationSummary = document.getElementById("publication-summary");

const publicationState = {
  language: "en",
  query: "",
  type: "all",
  year: "all"
};

publicationTextNodes.forEach(node => { node.dataset.i18nEn = node.textContent; });
publicationAriaNodes.forEach(node => {
  node.dataset.i18nAriaEn = node.getAttribute("aria-label") || "";
});
publicationPlaceholderNodes.forEach(node => {
  node.dataset.i18nPlaceholderEn = node.getAttribute("placeholder") || "";
});

function updatePublicationYearOptions(language) {
  const labels = publicationInterfaceText[language] || publicationInterfaceText.en;
  publicationYear.innerHTML = [
    `<option value="all">${labels.allYears}</option>`,
    ...publicationYears.map(year => `<option value="${year}">${year}</option>`)
  ].join("");
  publicationYear.value = publicationState.year;
}

function renderPublications(language) {
  publicationState.language = language;
  const titles = publicationSectionTitles[language] || publicationSectionTitles.en;
  const labels = publicationInterfaceText[language] || publicationInterfaceText.en;
  const normalizedQuery = publicationState.query.trim().toLowerCase();

  const matchingEntries = entries.filter(entry => {
    const typeMatches = publicationState.type === "all" || publicationCategory(entry) === publicationState.type;
    const yearMatches = publicationState.year === "all" || entry.year === publicationState.year;
    const queryMatches = !normalizedQuery || publicationSearchText(entry).includes(normalizedQuery);
    return typeMatches && yearMatches && queryMatches;
  });

  const categories = {
    preprint: matchingEntries.filter(entry => publicationCategory(entry) === "preprint"),
    journal: matchingEntries.filter(entry => publicationCategory(entry) === "journal"),
    conference: matchingEntries.filter(entry => publicationCategory(entry) === "conference")
  };

  const publicationContainer = document.getElementById("pub-container");
  publicationContainer.innerHTML = matchingEntries.length
    ? renderPublicationCategory(titles.preprints, "preprint", categories.preprint) +
      renderPublicationCategory(titles.journals, "journal", categories.journal) +
      renderPublicationCategory(titles.conferences, "conference", categories.conference)
    : `<div class="publication-empty">${labels.empty}</div>`;

  publicationSummary.textContent = labels.summary(matchingEntries.length);

  document.querySelectorAll(".bibtex-button").forEach(button => {
    button.addEventListener("click", () => {
      const entry = entries[Number(button.dataset.bibtexIndex)];
      if (entry) window.alert(entry.raw);
    });
  });
}

function applyPublicationLanguage(language, updateUrl) {
  const dictionary = publicationTranslations[language] || {};
  document.documentElement.lang = language;
  document.title = language === "fr"
    ? "Publications | Bowen Yi"
    : "Publications – Bowen Yi";

  publicationTextNodes.forEach(node => {
    const key = node.getAttribute("data-i18n");
    node.textContent = language === "fr" && dictionary[key]
      ? dictionary[key]
      : node.dataset.i18nEn;
  });

  publicationAriaNodes.forEach(node => {
    const key = node.getAttribute("data-i18n-aria");
    node.setAttribute(
      "aria-label",
      language === "fr" && dictionary[key]
        ? dictionary[key]
        : node.dataset.i18nAriaEn
    );
  });

  publicationPlaceholderNodes.forEach(node => {
    const key = node.getAttribute("data-i18n-placeholder");
    node.setAttribute(
      "placeholder",
      language === "fr" && dictionary[key]
        ? dictionary[key]
        : node.dataset.i18nPlaceholderEn
    );
  });

  publicationLanguageButtons.forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updatePublicationYearOptions(language);
  renderPublications(language);

  try {
    localStorage.setItem("bowen-site-language", language);
  } catch (error) {}

  if (updateUrl && window.history && window.history.replaceState) {
    const url = new URL(window.location.href);
    if (language === "fr") url.searchParams.set("lang", "fr");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }
}

publicationLanguageButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPublicationLanguage(button.dataset.language, true);
  });
});

publicationSearch.addEventListener("input", () => {
  publicationState.query = publicationSearch.value;
  renderPublications(publicationState.language);
});

publicationTypeButtons.forEach(button => {
  button.addEventListener("click", () => {
    publicationState.type = button.dataset.publicationType;
    publicationTypeButtons.forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    renderPublications(publicationState.language);
  });
});

publicationYear.addEventListener("change", () => {
  publicationState.year = publicationYear.value;
  renderPublications(publicationState.language);
});

const publicationParams = new URLSearchParams(window.location.search);
const publicationRequestedLanguage = publicationParams.get("lang");
let publicationSavedLanguage = null;
try {
  publicationSavedLanguage = localStorage.getItem("bowen-site-language");
} catch (error) {}

applyPublicationLanguage(
  publicationRequestedLanguage === "fr" ||
  (!publicationRequestedLanguage && publicationSavedLanguage === "fr")
    ? "fr"
    : "en",
  false
);
