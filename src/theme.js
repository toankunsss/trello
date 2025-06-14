import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252',
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: {
          main: '#000',
        }
      },
      spacing: (factor) => `${0.25 * factor}rem`
    }
  }
});

export default theme;
