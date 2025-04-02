import React, { useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";

import AppColorConstants from "../constants/app_color_constants";
import StyleConstants from "../constants/app_style_constants";
import AppText from "../components/text/appText";
import AppTextInput from "../components/textinput/app-textInput";
import AppDarkButton from "../components/buttons/appDarkButton";

import { Progress } from "../components/progress/progress";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import { MembershipValidationSchema } from "../schema/schema";
import { setRegisterationTabs } from "../redux/slices/appSlice";
import AppService from "../services/app.service";

interface InitialState {
  temporary_registeration_id: string;
  security_id: string;
}

type DetailsProps = {
  title: string;
  value: string | any;
  status?: "paid" | "unpaid" | any;
};

const Details = ({ title, value, status }: DetailsProps) => (
  <View style={style.details}>
    <AppText text={title} style={style.detailsTitle} />
    <View
      style={{
        backgroundColor:
          status === "paid"
            ? "#31C8590D"
            : status === "unpaid"
            ? "#FF382B0D"
            : "transparent",
        paddingHorizontal: status === "paid" || status === "unpaid" ? 10 : 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <AppText
        text={value}
        style={[
          style.detailsDescription,
          {
            color:
              status === "paid"
                ? "#31C859"
                : status === "unpaid"
                ? "#FF382B"
                : AppColorConstants.app_dark,
          },
        ]}
      />
    </View>
  </View>
);

function JacketAllocationScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { registerationTabs } = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState<boolean>();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<SecurityData | null>(null);
  const [errors, setShowErrors] = useState<InitialState>({
    temporary_registeration_id: "",
    security_id: "",
  });

  const form: InitialState = {
    temporary_registeration_id: "",
    security_id: "",
  };

  const handleAllocateSecurittID = async (values: InitialState) => {
    const payload = {
      memberId: values.temporary_registeration_id,
      securityId: values.security_id,
    };

    setLoading(true);
    const data: SecurityData | any = await AppService.addSecurityIDToMember(
      payload
    );
    setLoading(false);
    switch (data?.status) {
      case "400":
        if (data?.message?.includes("Security")) {
          formik.setFieldTouched("security_id", true);
          formik.setFieldError("security_id", data?.message);
          setShowErrors({
            temporary_registeration_id: "",
            security_id: data?.message,
          });
        } else {
          formik.setFieldTouched("temporary_registeration_id", true);
          formik.setFieldError("temporary_registeration_id", data?.message);
          setShowErrors({
            temporary_registeration_id: data?.message,
            security_id: "",
          });
        }
        break;
      case "404":
        formik.setFieldError("security_id", data?.message);
        break;
      default:
        setUserData(data);
        dispatch(setRegisterationTabs(2));
        break;
    }
  };

  const formik = useFormik({
    initialValues: form,
    validationSchema: MembershipValidationSchema,
    onSubmit: handleAllocateSecurittID,
  });

  const username = `${userData && userData.firstName}  ${
    userData && userData.lastName
  }`;

  const handleAllocateJacket = async () => {
    const payload = {
      memberId: userData && userData.memberId,
      securityId: userData && userData.securityId,
      action: "allocate",
    };

    setLoading(true);
    const data: SecurityData = await AppService.allocateJacket(payload);
    if (data) {
      setLoading(false);
      formik.resetForm();
      navigation.navigate("success");
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        translucent={false}
        backgroundColor={AppColorConstants.app_dark}
      />
      <View style={style.root}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 30, flexGrow: 1, paddingBottom: 35 }}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ gap: 10, alignItems: "center" }}>
              <Image
                source={require("../assets/png/kaduna_state_logo.jpg")}
                style={style.oyo}
                contentFit="contain"
              />
              <AppText
                text="Kaduna State Motorcycle Tricycle Taxi Security & Welfare Scheme"
                style={style.maintitle}
              />
            </View>
          </View>

          <View style={{ gap: 40, flex: 1 }}>
            <AppText text="Jacket Allocation" style={style.title} />
            <View
              style={{
                gap: 30,
                flex: 1,
                alignItems: "center",
              }}
            >
              <Progress step={registerationTabs} />

              {registerationTabs === 1 && (
                <View style={{ width: "100%", gap: 30 }}>
                  <AppText
                    text={
                      registerationTabs === 1
                        ? "Allocation Details"
                        : registerationTabs === 2
                        ? "Member’s Personal Details "
                        : "Allocation Details"
                    }
                    style={style.membership_title}
                  />

                  <View style={{ gap: 25 }}>
                    <AppTextInput
                      label="Member ID"
                      onChangeText={(text) => {
                        formik.setFieldValue(
                          "temporary_registeration_id",
                          text
                        );
                        setShowErrors({
                          ...errors,
                          temporary_registeration_id: "",
                          security_id: "",
                        });
                      }}
                      value={formik.values.temporary_registeration_id}
                      onBlur={formik.handleBlur("temporary_registeration_id")}
                      placeholder="Enter a Member's ID"
                      errorMessage={
                        formik.errors.temporary_registeration_id &&
                        formik.touched.temporary_registeration_id
                          ? formik.errors.temporary_registeration_id
                          : errors.temporary_registeration_id
                      }
                      autoFocus={true}
                      inputMode="numeric"
                      maxLength={8}
                      keyboardType="numeric"
                      textInputStyle={{
                        borderColor:
                          formik.touched.temporary_registeration_id &&
                          formik.errors.temporary_registeration_id
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    <AppTextInput
                      label="Security ID"
                      onChangeText={(text) => {
                        const formatted = text
                          .toUpperCase()
                          .replace(/[^A-Z0-9-]/g, "");
                        if (!formatted.includes("-") && formatted.length > 2) {
                          formik.setFieldValue(
                            "security_id",
                            `${formatted.slice(0, 2)}-${formatted.slice(2)}`
                          );
                          setShowErrors({
                            ...errors,
                            security_id: "",
                          });
                        } else {
                          formik.setFieldValue("security_id", formatted);
                          setShowErrors({
                            ...errors,
                            security_id: "",
                          });
                        }
                      }}
                      value={formik.values.security_id}
                      placeholder="Enter a Security ID"
                      onBlur={formik.handleBlur("security_id")}
                      errorMessage={
                        formik.errors.security_id && formik.touched.security_id
                          ? formik.errors.security_id
                          : errors.security_id
                      }
                      inputMode="text"
                      keyboardType="name-phone-pad"
                      maxLength={7}
                      textInputStyle={{
                        borderColor:
                          formik.touched.security_id &&
                          formik.errors.security_id
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    <View style={{ marginTop: "10%" }}>
                      <AppDarkButton
                        text="Proceed"
                        activeOpacity={0.7}
                        loading={loading}
                        disabled={!formik.isValid || loading}
                        onPress={() => formik.handleSubmit()}
                      />
                    </View>
                  </View>
                </View>
              )}

              {registerationTabs === 2 && (
                <>
                  <View
                    style={{ width: "100%", gap: 30, alignItems: "center" }}
                  >
                    <Image
                      source={
                        userData?.photoReference === null
                          ? require("../assets/png/default.png")
                          : { uri: userData?.photoReference }
                      }
                      style={style.avatar}
                    />
                    <View style={style.detailsContainer}>
                      <Details title="Name" value={username} />
                      <Details
                        title="Membership ID"
                        value={userData?.memberId}
                      />
                      <Details
                        title="LGA"
                        value={userData?.lgaEntity.lgaName}
                      />
                      <Details
                        title="Security ID"
                        value={userData?.securityId}
                      />
                    </View>

                    <View
                      style={{ width: "100%", flexDirection: "row", gap: 10 }}
                    >
                      <View style={{ flex: 1 }}>
                        <AppDarkButton
                          text="Back"
                          onPress={() => dispatch(setRegisterationTabs(1))}
                          disabled={userData !== null}
                        />
                      </View>

                      <View style={{ flex: 1 }}>
                        <AppDarkButton
                          text="Allocate Jacket"
                          disabled={loading}
                          loading={loading}
                          onPress={() => handleAllocateJacket()}
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
          <View
            style={{
              gap: 10,
              alignItems: "center",
            }}
          >
            <AppText text="Powered by" style={{ alignItems: "center" }} />
            <Image
              source={require("../assets/png/logo.png")}
              style={style.logo}
              contentFit="contain"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

export default JacketAllocationScreen;

const style = StyleSheet.create({
  root: {
    ...StyleConstants.container,
  },

  title: {
    ...StyleConstants.bigText,
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
  },

  maintitle: {
    ...StyleConstants.bigText,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: -0.23,
    fontSize: 24,
    lineHeight: 28,
  },

  avatar: { width: 136, height: 136, borderRadius: 100 },

  label: {
    fontSize: 16,
    // fontFamily
    lineHeight: 19.6,
    color: AppColorConstants.app_dark,
  },

  membership_title: {
    fontSize: 24,
    // fontFamily
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: -0.2,
    color: AppColorConstants.app_dark,
  },

  logo: {
    width: 163.1,
    height: 44,
  },

  oyo: {
    width: 200,
    height: 200,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailsContainer: {
    gap: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D2D2D7",
    borderRadius: 9,
    width: "100%",
  },

  detailsTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "#000000",
    letterSpacing: -0.43,
  },

  detailsDescription: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: AppColorConstants.app_dark,
    letterSpacing: -0.43,
    textTransform: "capitalize",
  },
});
