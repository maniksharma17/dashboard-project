// color design tokens export

import { PaletteMode, ThemeOptions } from "@mui/material";

interface ColorShades {
  [key: number]: string; // Numeric keys representing shades, with hex color strings as values
}

interface Tokens {
  grey: ColorShades;
  primary: ColorShades;
  secondary: ColorShades;
}

export const tokensDark: Tokens = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  secondary: {
    // zinc
    100: "#d3d4de",
    200: "#dcdee8",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  primary: {
    // blue
    100: "#d4d4d4",
    200: "#a9a9a9",
    300: "#7f7f7f",
    400: "#545454",
    500: "#292929",
    600: "#212121",
    700: "#191919",
    800: "#101010",
    900: "#080808"

  },
  
};

// function that reverses the color palette
function reverseTokens(tokensDark: Tokens): Tokens {
  const reversedTokens: Tokens = {
    grey: {},
    primary: {},
    secondary: {}
  };
  Object.entries(tokensDark).forEach(([key, val]: [key: string, val: ColorShades]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj: {[key: number]: string} = {};
    for (let i = 0; i < length; i++) {
      reversedObj[+keys[i]] = values[length - i - 1];
    }
    reversedTokens[key as keyof Tokens] = reversedObj;
  });

  return reversedTokens;
}

export const tokensLight: Tokens = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode: string|PaletteMode): ThemeOptions => {
  return {
    palette: {
      mode: mode as PaletteMode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[100],
              dark: tokensDark.primary[800]
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
              light: tokensDark.secondary[200],
              dark: tokensDark.secondary[800]
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[1000],
            },
            background: {
              default: tokensDark.primary[700],
              paper: tokensDark.primary[600],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[400],
              light: tokensLight.primary[200],
              dark: tokensLight.primary[800],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[400],
              light: tokensLight.secondary[200],
              dark: tokensLight.secondary[800],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[1000],
            },
            background: {
              default: tokensLight.grey[800],
              paper: tokensLight.grey[700],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};