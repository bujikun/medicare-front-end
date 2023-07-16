import { extendTheme } from "@chakra-ui/theme-utils";

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        bg: "#eee",
        color: "#333",
        height: "100vh",
        overflowX: "hidden",
      },
    },
  },
});