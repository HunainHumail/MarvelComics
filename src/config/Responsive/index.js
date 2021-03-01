import { Dimensions, PixelRatio, Platform } from "react-native";
let { height, width } = Dimensions.get("window");

const scale = height / 812;

const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const VerticalSize = (size = 812) => (size / 812) * height;
const HorizontalSize = (size = 375) => (size / 375) * width;

export default {
    FontRegular: normalize(16),
    FontExtraSmall: normalize(12),
    FontSmallest: normalize(10),
    FontSmall: normalize(14),
    FontMedium: normalize(20),
    FontLarge: normalize(45),
    VerticalSize,
    HorizontalSize,
  };
  