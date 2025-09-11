// theme.js
export const inputStyles = {
  input: {
    backgroundColor: "#d9d9d9cd",
    color: "#000000ff",
    borderColor: "#040202ff",
    "&::placeholder": {
      color: "#000000ff",
      opacity: 1,
    },
  },
  label: {
    color: "#050505ff",
  },
  item: {
    backgroundColor: "#d9d9d9cd",
    color: "#000000ff",
    "&[data-hovered]": {
      backgroundColor: "#c0c0c0",
      color: "#000000ff",
    },
    "&[data-selected]": {
      backgroundColor: "#a0a0a0",
      color: "#000000ff",
    },
  },
  dropdown: {
    backgroundColor: "#d9d9d9cd",
  },
};

export const cardStyles = {
  backgroundColor: "#35476b28",
  color: "#000000ff",
};

export const themeColors = {
  darkgreen: [
    "#e6f4e6",
    "#c2e3c2",
    "#9dd29d",
    "#78c278",
    "#53b153",
    "#3a973a",
    "#2c7530",
    "#1e5223",
    "#103116",
    "#051406",
  ],
};
