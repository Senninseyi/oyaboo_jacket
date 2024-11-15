import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppColorConstants from "../../constants/app_color_constants";
import StyleConstants from "../../constants/app_style_constants";
import AppText from "../../components/text/appText";
import AppTextInput from "../../components/textinput/app-textInput";
import AppDarkButton from "../../components/buttons/appDarkButton";
import AuthService from "../../services/auth.service";

import { LoginValidationSchema } from "../../schema/schema";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { updateUserData, updateUserToken } from "../../redux/slices/authSlice";

type InitialState = {
  username: string;
  password: string;
};

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const [showPassowrd, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form: InitialState = {
    password: "",
    username: "",
  };

  const handleLogin = async (values: any) => {
    setLoading(true);
    const payload = {
      userName: values.username,
      password: values.password,
    };

    const data = await AuthService.login(payload);
    if (data) {
      dispatch(updateUserToken(data?.token));
      dispatch(updateUserData(data));

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: form,
    validationSchema: LoginValidationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        translucent={false}
        backgroundColor={AppColorConstants.app_dark}
      />

      <View style={style.root}>
        <View style={{ gap: 25, flex: 1 }}>
          <AppText text="Agent's Login" style={style.title} />
          <KeyboardAwareScrollView
            contentContainerStyle={{ gap: 40, paddingBottom: 35 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 50 }}>
              <View style={{ gap: 25 }}>
                <AppTextInput
                  label="Username"
                  onChangeText={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                  value={formik.values.username}
                  autoFocus={true}
                  errorMessage={
                    formik.touched.username && formik.errors.username
                      ? formik.errors.username
                      : null
                  }
                  textInputStyle={{
                    borderColor:
                      formik.touched.username && formik.errors.username
                        ? AppColorConstants.app_dark
                        : "#D9D9D9",
                  }}
                />

                <AppTextInput
                  label="Password"
                  onChangeText={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                  errorMessage={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                  textInputStyle={{
                    borderColor:
                      formik.touched.password && formik.errors.password
                        ? AppColorConstants.app_dark
                        : "#D9D9D9",
                  }}
                  secureTextEntry={!showPassowrd}
                  right={
                    <TextInput.Icon
                      icon={showPassowrd ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassowrd)}
                    />
                  }
                />
              </View>
              <AppDarkButton
                text="Agent's Login"
                activeOpacity={0.6}
                loading={loading}
                disabled={!formik.isValid || loading}
                onPress={() => {
                  if (!formik.isValidating && formik.touched) {
                    formik.handleSubmit();
                  }
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </>
  );
}

export default LoginScreen;

const style = StyleSheet.create({
  root: {
    ...StyleConstants.container,
    backgroundColor: AppColorConstants.white,
    paddingTop: 80,
  },

  title: {
    ...StyleConstants.bigText,
    fontWeight: "bold",
    fontSize: 32,
    lineHeight: 32,
  },
});
