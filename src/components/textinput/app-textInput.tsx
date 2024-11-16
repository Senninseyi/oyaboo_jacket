import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

import AppText from "../text/appText";
import AppColorConstants from "../../constants/app_color_constants";

interface AppTextInputProp extends TextInputProps {
  label?: string;
  errorMessage?: string | any;
  textInputStyle?: object;
}

const AppTextInput: React.FC<AppTextInputProp> = ({
  label,
  errorMessage,
  onBlur: onBlur,
  value,
  onChangeText: onChangeText,
  textInputStyle,
  ...props
}) => {
  return (
    <View style={{ gap: 6 }}>
      {label && <AppText text={label} style={style.label} />}
      <TextInput
        value={value}
        mode="flat"
        onBlur={onBlur}
        autoComplete="off"
        onChangeText={onChangeText}
        cursorColor={AppColorConstants.app_dark}
        selectionColor={AppColorConstants.app_dark}
        autoCapitalize="sentences"
        underlineStyle={{ display: "none" }}
        style={[style.textInput, textInputStyle]}
        placeholderTextColor={"#949494"}
        theme={{
          roundness: 9.17,
        }}
        {...props}
      />

      {errorMessage && (
        <View>
          <AppText text={errorMessage} style={style.errorMessage} />
        </View>
      )}
    </View>
  );
};

export default AppTextInput;

const style = StyleSheet.create({
  textInput: {
    backgroundColor: AppColorConstants.white,
    paddingHorizontal: 16,
    borderRadius: 9.17,
    height: 50,
    width: "100%",
    flex: 1,
    // fontFamily: AppFont.REGULAR_FONT,
    fontSize: 16,
    borderWidth: 1.15,
    borderColor: "#D9D9D9",
    textTransform: "capitalize",
  },

  errorMessage: {
    textAlign: "left",
    color: "red",
    fontWeight: "500",
    // fontFamily: '',
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.6,
    color: AppColorConstants.app_dark,
  },

  focusedInput: {
    borderColor: AppColorConstants.app_dark,
  },
});
