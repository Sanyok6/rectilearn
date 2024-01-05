import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, type StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps | Record<string, any>) => ({
    body: {
      bg: mode('#fff', '#202023')(props),
      textAlign: "center"
    }
  })
}

export const config: ThemeConfig = {
  initialColorMode: "system"
};

const theme = extendTheme({ config, styles });

export default theme;
