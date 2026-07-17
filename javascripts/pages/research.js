/* Extracted from research.html — block 1. */
(function () {
    var translations = {
      fr: {
        'nav.label': 'Navigation principale',
        'nav.home': 'Accueil',
        'nav.research': 'Recherche',
        'nav.overview': 'Aperçu',
        'nav.people': 'Équipe',
        'nav.positions': 'Postes',
        'nav.teaching': 'Enseignement',
        'nav.other': 'Autres',
        'nav.calendar': 'Calendrier',
        'nav.awards': 'Prix',
        'nav.misc': 'Divers',
        'language.selector': 'Sélection de la langue',
        'hero.kicker': 'Aperçu de la recherche · De la théorie à la robotique',
        'hero.title': 'Aperçu de la recherche',
        'hero.intro': 'Mes travaux développent des <strong>théories et algorithmes pour l’estimation, l’apprentissage et la commande des systèmes dynamiques non linéaires</strong>, avec un intérêt marqué pour la <strong>robotique et les systèmes autonomes</strong>. L’objectif est d’allier des garanties mathématiques rigoureuses à des méthodes utiles sur des plateformes réelles.',
        'focus.label': 'Thèmes de recherche principaux',
        'focus.estimation': 'Estimation',
        'focus.learning': 'Apprentissage',
        'focus.control': 'Commande',
        'focus.robotics': 'Robotique',
        'visual.alt': 'Une chaîne visuelle reliant les capteurs et l’estimation d’état, l’apprentissage de Koopman, la commande non linéaire et la robotique autonome.',
        'areas.title': 'Axes de recherche',
        'area.estimation.title': 'Estimation et théorie des observateurs',
        'area.estimation.text': 'Estimation d’état en temps réel pour les systèmes de commande non linéaires, avec un accent sur la convergence et la robustesse.',
        'area.estimation.k1': 'Observateurs non linéaires : KKL, PEBO, DREM',
        'area.estimation.k2': 'Observateurs adaptatifs',
        'area.estimation.k3': 'Commande sans capteur',
        'area.learning.title': 'Identification de systèmes et apprentissage',
        'area.learning.text': 'Modèles fondés sur les données qui relient l’identification des systèmes à la théorie moderne de l’apprentissage.',
        'area.learning.k1': 'Identification des systèmes non linéaires',
        'area.learning.k2': 'Apprentissage par opérateur de Koopman',
        'area.learning.k3': 'Estimation paramétrique en temps réel',
        'area.control.title': 'Commande non linéaire',
        'area.control.text': 'Conception de commandes pour les systèmes non linéaires incertains, à partir de points de vue structurels et énergétiques.',
        'area.control.k1': 'Commande adaptative',
        'area.control.k2': 'Stabilisation orbitale',
        'area.control.k3': 'Commande basée sur la passivité',
        'area.control.k4': 'Analyse par contraction',
        'area.robotics.title': 'Robotique et systèmes autonomes',
        'area.robotics.text': 'Méthodes d’estimation, d’apprentissage et de commande pour les robots évoluant dans des environnements complexes et incertains.',
        'area.robotics.k1': 'Robots continus',
        'area.robotics.k2': 'Navigation et localisation',
        'area.robotics.k3': 'Systèmes autonomes',
        'resources.title': 'Tutoriels et diapositives à la une',
        'resources.type.tutorial': 'Tutoriel · PDF',
        'resources.type.slides': 'Diapositives · PDF',
        'resources.view': 'Voir le PDF',
        'resource.pebo.title': 'Observateur fondé sur l’estimation paramétrique (PEBO)',
        'resource.pebo.text': 'Une introduction à la conception d’observateurs par estimation paramétrique.',
        'resource.ifac.title': 'Estimation sans capteur haute performance pour les IPMSM',
        'resource.ifac.text': 'Diapositives choisies sur l’estimation sans capteur haute performance pour les machines synchrones à aimants permanents intérieurs.',
        'resource.koopman.title': 'Apprentissage de Koopman',
        'resource.koopman.text': 'Représentations et modèles appris pour les systèmes dynamiques non linéaires.',
        'resource.orbital.title': 'Stabilisation orbitale',
        'resource.orbital.text': 'Méthodes non linéaires pour stabiliser des mouvements périodiques et des orbites cibles.',
        'resource.icra.title': 'Modélisation, rigidification et commande des robots continus',
        'resource.icra.text': 'Travaux choisis reliant la théorie des systèmes non linéaires à la robotique.',
        'links.prompt': 'Découvrez les travaux, l’équipe et les possibilités de collaboration.',
        'links.publications': 'Publications',
        'links.people': 'Équipe de recherche',
        'links.positions': 'Postes disponibles',
        'footer.rights': 'Tous droits réservés.',
        'footer.privacy': 'Politique de confidentialité'
      }
    };

    var textNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
    var htmlNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-html]'));
    var ariaNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-aria]'));
    var altNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-alt]'));
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-language]'));
    var metaDescription = document.querySelector('meta[name="description"]');

    textNodes.forEach(function (node) { node.dataset.i18nEn = node.textContent; });
    htmlNodes.forEach(function (node) { node.dataset.i18nEn = node.innerHTML; });
    ariaNodes.forEach(function (node) { node.dataset.i18nAriaEn = node.getAttribute('aria-label') || ''; });
    altNodes.forEach(function (node) { node.dataset.i18nAltEn = node.getAttribute('alt') || ''; });

    function applyLanguage(language, updateUrl) {
      var dictionary = translations[language] || {};
      document.documentElement.lang = language;
      document.title = language === 'fr' ? 'Aperçu de la recherche | Bowen Yi' : 'Bowen Yi - Research';
      if (metaDescription) {
        metaDescription.content = language === 'fr'
          ? 'Recherche en estimation, apprentissage, commande non linéaire et robotique par Bowen Yi à Polytechnique Montréal.'
          : 'Research in nonlinear estimation, learning, control, and robotics by Bowen Yi at Polytechnique Montréal.';
      }

      textNodes.forEach(function (node) {
        var key = node.getAttribute('data-i18n');
        node.textContent = language === 'fr' && dictionary[key] ? dictionary[key] : node.dataset.i18nEn;
      });
      htmlNodes.forEach(function (node) {
        var key = node.getAttribute('data-i18n-html');
        node.innerHTML = language === 'fr' && dictionary[key] ? dictionary[key] : node.dataset.i18nEn;
      });
      ariaNodes.forEach(function (node) {
        var key = node.getAttribute('data-i18n-aria');
        node.setAttribute('aria-label', language === 'fr' && dictionary[key] ? dictionary[key] : node.dataset.i18nAriaEn);
      });
      altNodes.forEach(function (node) {
        var key = node.getAttribute('data-i18n-alt');
        node.setAttribute('alt', language === 'fr' && dictionary[key] ? dictionary[key] : node.dataset.i18nAltEn);
      });
      buttons.forEach(function (button) {
        var active = button.dataset.language === language;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      try { localStorage.setItem('bowen-site-language', language); } catch (error) {}
      if (updateUrl && window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        if (language === 'fr') url.searchParams.set('lang', 'fr');
        else url.searchParams.delete('lang');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () { applyLanguage(button.dataset.language, true); });
    });

    document.querySelectorAll('[data-current-year]').forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });

    var params = new URLSearchParams(window.location.search);
    var requested = params.get('lang');
    var saved = null;
    try { saved = localStorage.getItem('bowen-site-language'); } catch (error) {}
    applyLanguage(requested === 'fr' || (!requested && saved === 'fr') ? 'fr' : 'en', false);
  }());
