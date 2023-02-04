export * from '@rneui/themed';

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module '@rneui/themed' {
  export interface TextProps {
    bold?: boolean;
  }

  export interface Colors {
    background: string;
    lightgrey: string;
    textPrimary: string;
    textSecondary: string;
    buttonText: string;
  }

  export interface Sizing {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  }

  export interface FontFamily {
    light: string;
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
    extraBold: string;
  }

  export interface CreateThemeOptions {
    colors: RecursivePartial<Colors>;
    spacing: Sizing;
    borderRadii: Sizing;
    fontSize: Sizing;
    fontFamily: FontFamily;
  }

  export interface FullTheme {
    colors: Colors;
    spacing: Sizing;
    borderRadii: Sizing;
    fontSize: Sizing;
    fontFamily: FontFamily;
  }

  export interface Theme {
    colors: Colors;
    spacing: Sizing;
    borderRadii: Sizing;
    fontSize: Sizing;
    fontFamily: FontFamily;
  }
}
