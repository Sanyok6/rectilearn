import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props : any) => ({
    body: {
      bg: mode('#fff', '#202023')(props),
      textAlign: "center"
    }
  })
}

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme: any = extendTheme({ config, styles });

export default theme;
