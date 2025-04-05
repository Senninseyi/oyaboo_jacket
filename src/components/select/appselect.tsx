import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import AppColorConstants from "../../constants/app_color_constants";
import AppText from "../text/appText";

interface AppSelectProps {
  label: string;
  data: any[];
  onChange: (value: string) => void;
  errorMessage?: string | any;
  customDropdownStyle?: object;
  value: string;
  placeholder?: string;
  search?: boolean;
  dropdownPosition?: "top" | "bottom" | "auto";
  disabled?: boolean;
  mode?: "auto" | "default" | "modal";
}

export const AppSelect = ({
  label,
  data,
  onChange = () => {},
  errorMessage,
  value,
  customDropdownStyle,
  placeholder,
  dropdownPosition = "auto",
  disabled,
  mode = "default",
  ...rest
}: AppSelectProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View style={{ gap: 6 }}>
      {label && <AppText text={label} style={[style.label]} />}

      <Dropdown
        style={[style.dropdown, customDropdownStyle]}
        data={data.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        dropdownPosition={dropdownPosition}
        fontFamily="Inter-Regular"
        disable={disabled}
        mode={mode}
        placeholder={!isFocus ? placeholder : "..."}
        placeholderStyle={{ color: "rgba(138, 138, 138, 1)" }}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
        {...rest}
      />

      {errorMessage && (
        <AppText text={errorMessage} style={style.errorMessage} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 16,
    borderRadius: 9.17,
    height: 50,
    fontSize: 16,
    width: "100%",
    flex: 1,
    borderWidth: 1.15,
    borderColor: "#D9D9D9",
    textTransform: "capitalize",
    backgroundColor: AppColorConstants.white,
  },

  errorMessage: {
    textAlign: "left",
    color: "red",
    fontWeight: "500",
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.6,
    color: AppColorConstants.app_dark,
  },
});
