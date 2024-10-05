import { Platform } from "react-native";
import AppColorConstants from "./app_color_constants";

const StyleConstants = {
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 55,
    paddingHorizontal: 23,
    backgroundColor: AppColorConstants.white,
  },

  bigText: {
    fontSize: 36,
    fontFamily: "SF Pro Display",
    lineHeight: 43.2,
    letterSpacing: -0.23,
    color: AppColorConstants.app_dark,
  },
};

export default StyleConstants;
