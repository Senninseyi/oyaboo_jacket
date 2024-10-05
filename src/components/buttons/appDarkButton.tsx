import React from "react";
import {
  ButtonProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import AppText from "../text/appText";
import AppColorConstants from "../../constants/app_color_constants";

interface AppButtonProps extends TouchableOpacityProps {
  text: string;
  onPress?: ButtonProps["onPress"];
  disabled?: boolean;
  loading?: boolean;
}

const AppDarkButton: React.FC<AppButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} {...props}>
      <View
        style={[
          style.darkbutton,
          {
            backgroundColor:
              disabled === true ? "#D2D2D7" : AppColorConstants.app_dark,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={AppColorConstants.white} size={24} />
        ) : (
          <AppText text={text} style={style.text} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppDarkButton;

const style = StyleSheet.create({
  darkbutton: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
  },

  text: {
    color: AppColorConstants.white,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "700",
  },
});
