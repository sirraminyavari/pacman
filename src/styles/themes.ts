import { createGlobalStyle } from "styled-components";

export const ThemeColors = {
  Primary: "var(--color-primary)",
  Primary_Dark: "var(--color-primary-dark)",
  Gray: "var(--color-gray)",
  Gray_Light: "var(--color-light-gray)",
  Gray_VeryLight: "var(--color-very-light-gray)",
};

/**
 * @description never use the theme color by typing 'var(--[some-color-name])'; instead, use their respective constant.
 * respective constants of all theme colors are defined in a file in the 'constants' folder.
 */
export const Themes = createGlobalStyle`
  .theme-default {
    --color-primary: #4285F4;
    --color-primary-dark: #050E5C;
    --color-gray: rgb(206, 196, 186);
    --color-light-gray: rgb(236, 226, 216);
    --color-very-light-gray: rgb(246, 236, 226);
  }
`;
