// Generate an object with default colorTheme properties
export const defaultColorTheme = () => [
  { label: "Tło", property: "--bg-color", value: "#fffefa" },
  { label: "Akcent", property: "--accent-color", value: "#a96060" },
  { label: "Tekst", property: "--font-color", value: "#333333" },
  { label: "Tag1", property: "--tag-0-color", value: "#ffe047" },
  { label: "Tag2", property: "--tag-1-color", value: "#7ab4ff" },
  { label: "Tag3", property: "--tag-2-color", value: "#dd6b6b" },
];

// Load colorTheme from localStorage
export const loadColorTheme = () =>
  JSON.parse(localStorage.getItem("colorTheme"));

// Save colorTheme in localStorage
export const saveColorTheme = (colorTheme) =>
  localStorage.setItem("colorTheme", JSON.stringify(colorTheme));

// Apply colorTheme to the :root element
export const applyColorTheme = (colorTheme) => {
  // Get Root element
  const root = document.querySelector(":root");
  // Update values
  colorTheme.forEach((color) => {
    root.style.setProperty(color.property, color.value);
  });
};
