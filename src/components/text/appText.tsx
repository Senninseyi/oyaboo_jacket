import React from "react";
import { Text, TextStyle } from "react-native";

interface AppTextProps {
  text: string;
  style?: TextStyle | TextStyle[];
}

const AppText: React.FC<AppTextProps> = ({ text, style }) => {
  return (
    <Text style={style} allowFontScaling={true}>
      {text}
    </Text>
  );
};

export default AppText;
