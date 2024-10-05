import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";

import AppColorConstants from "../constants/app_color_constants";
import StyleConstants from "../constants/app_style_constants";
import AppText from "../components/text/appText";
import AppDarkButton from "../components/buttons/appDarkButton";

import { useAppDispatch } from "../redux/hooks/hooks";
import { setRegisterationTabs } from "../redux/slices/appSlice";

function SuccessScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useAppDispatch();

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={AppColorConstants.app_dark}
      />
      <View style={style.root}>
        <View style={{ gap: 25 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../assets/png/checkmark-icon.png")}
              style={style.success}
              contentFit="cover"
            />
          </View>

          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 7 }}
          >
            <AppText text="Success" style={style.title} />
            <AppText
              text="Jacket allocated successfully"
              style={style.description}
            />
          </View>
        </View>

        <AppDarkButton
          text="Back to Home"
          activeOpacity={0.7}
          onPress={() => {
            dispatch(setRegisterationTabs(1));
            navigation.navigate("membershipdetails");
          }}
        />
      </View>
    </>
  );
}

export default SuccessScreen;

const style = StyleSheet.create({
  root: {
    ...StyleConstants.container,
    backgroundColor: AppColorConstants.white,
    paddingTop: 80,
    gap: 50,
    justifyContent: "center",
  },

  success: {
    width: 319,
    height: 112,
  },

  title: {
    fontSize: 32.11,
    lineHeight: 32.11,
    letterSpacing: -0.23,
    textAlign: "center",
    fontWeight: "600",
    color: AppColorConstants.app_dark,
  },

  description: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.43,
    textAlign: "center",
    color: AppColorConstants.app_dark,
  },
});
