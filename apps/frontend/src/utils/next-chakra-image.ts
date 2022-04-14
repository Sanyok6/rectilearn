import { chakra } from "@chakra-ui/system";
import NextImage from 'next/image';

export const Image = chakra(NextImage, {
    baseStyle: { maxH: 120, maxW: 120 },
    shouldForwardProp: (prop) =>
      [
        "width",
        "height",
        "src",
        "alt",
        "quality",
        "placeholder",
        "blurDataURL",
        "loader",
        "layout",
        "onLoad"
      ].includes(prop),
});