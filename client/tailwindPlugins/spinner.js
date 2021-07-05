module.exports = function ({ addUtilities }) {
  const buildPluginUtilityObject = (size) => {
    return {
      "pointer-events": "none",

      "&::after": {
        content: `''`,

        position: "relative",
        left: `calc(50% - (${size} / 2))`,

        display: "block",
        width: size,
        height: size,

        border: "2px solid currentColor",
        "border-radius": "9999px",
        "border-right-color": "transparent",
        "border-top-color": "transparent",

        animation: "spinAround 500ms infinite linear",
      },
    };
  };

  addUtilities({
    "@keyframes spinAround": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    ".spinner": buildPluginUtilityObject("1em"),
    ".spinner-md": buildPluginUtilityObject("2em"),
  });
};
