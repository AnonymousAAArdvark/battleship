import 'styled-components';
interface IPalette {
  main: string
  contrastText: string
}
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      ship: string,
      shipSunk: string,
      tile_border: string,
      marked: string,
      valid: string,
      invalid: string,
      displayBackground: string,
      background: string;
      gridBackground: string;
      displayBorder: string;
    },
  }
}