"use strict";

const STORAGE_KEY = "jkdPortfolioSettings";

const defaultSettings = {
  theme: "light",
  visitorName: "",
  lastVisit: null
};

// Read saved settings. Invalid or unavailable storage falls back to defaults.
function loadSettings() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (!savedValue) return { ...defaultSettings };

    const savedSettings = JSON.parse(savedValue);
    if (!savedSettings || typeof savedSettings !== "object" || Array.isArray(savedSettings)) {
      return { ...defaultSettings };
    }

    return {
      ...defaultSettings,
      ...savedSettings,
      theme: savedSettings.theme === "dark" ? "dark" : "light"
    };
  } catch (error) {
    console.warn("Saved settings could not be read. Default settings will be used.", error);
    return { ...defaultSettings };
  }
}

// Save settings as JSON. The page still works if browser storage is unavailable.
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.warn("Settings could not be saved in this browser.", error);
    return false;
  }
}
