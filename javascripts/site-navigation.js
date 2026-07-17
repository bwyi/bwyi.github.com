(function () {
  "use strict";

  function initialiseNavigation() {
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });

    var header = document.querySelector(".wrapper > header");
    if (!header) return;

    var navigation = header.querySelector(".site-nav");
    if (!navigation) return;

    if (!navigation.id) navigation.id = "site-navigation";

    var menuButton = header.querySelector(".mobile-nav-toggle");
    if (!menuButton) {
      menuButton = document.createElement("button");
      menuButton.className = "mobile-nav-toggle";
      menuButton.type = "button";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-controls", navigation.id);
      header.insertBefore(menuButton, navigation);
    }

    function isFrench() {
      return document.documentElement.lang.toLowerCase().indexOf("fr") === 0;
    }

    function updateButton() {
      var isOpen = navigation.classList.contains("is-open");
      var label = isFrench()
        ? (isOpen ? "Fermer" : "Menu")
        : (isOpen ? "Close" : "Menu");
      var icon = isOpen ? "fa-times" : "fa-bars";

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", label);
      menuButton.innerHTML = '<i class="fa ' + icon + '" aria-hidden="true"></i> ' + label;
    }

    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("is-open");
      updateButton();
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a") && window.matchMedia("(max-width: 700px)").matches) {
        navigation.classList.remove("is-open");
        updateButton();
      }
    });

    var mediaQuery = window.matchMedia("(max-width: 700px)");
    function resetDesktopNavigation(event) {
      if (!event.matches) {
        navigation.classList.remove("is-open");
        updateButton();
      }
    }
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", resetDesktopNavigation);
    } else {
      mediaQuery.addListener(resetDesktopNavigation);
    }

    new MutationObserver(updateButton).observe(document.documentElement, {
      attributeFilter: ["lang"]
    });
    updateButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseNavigation);
  } else {
    initialiseNavigation();
  }
}());
