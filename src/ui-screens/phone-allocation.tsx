import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";

import AppColorConstants from "../constants/app_color_constants";
import StyleConstants from "../constants/app_style_constants";
import AppText from "../components/text/appText";
import AppTextInput from "../components/textinput/app-textInput";
import AppDarkButton from "../components/buttons/appDarkButton";

import { Progress } from "../components/progress/progress";
import AppService from "../services/app.service";
import { AppSelect } from "../components/select/appselect";

interface InitialState {
  phone_make?: string;
  phone_model?: string;
  phone_serial_no?: string;
  phone_status?: string;
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

function PhoneAllocationScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [registerationTabs, setRegisterationTabs] = useState<number>(1); // Local state for tabs
  const [loading, setLoading] = useState<boolean>();
  const [phoneResponse, setPhoneResponse] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [agents, setAgents] = useState<any>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const form: InitialState = {
    phone_make: "",
    phone_model: "",
    phone_serial_no: "",
    phone_status: "",
  };

  const getAgents = async () => {
    const response = await AppService.getAllAgents(1, 11);
    if (response) {
      setAgents(response.content);
    }
  };

  useEffect(() => {
    if (registerationTabs === 2) {
      getAgents();
    }
  }, [registerationTabs]);

  const PhoneAllocationValidationSchema = Yup.object().shape({
    phone_make: Yup.string()
      .required("Phone Make is required")
      .max(50, "Phone Make cannot exceed 50 characters"),
    phone_model: Yup.string()
      .required("Phone Model is required")
      .max(50, "Phone Model cannot exceed 50 characters"),
    phone_serial_no: Yup.string()
      .required("Phone Serial Number is required")
      .max(50, "Phone Serial Number cannot exceed 50 characters"),
    phone_status: Yup.string()
      .required("Phone Status is required")
      .oneOf(
        ["Active", "Inactive", "Broken", "Stolen", "Repair"],
        "Invalid Phone Status"
      ),
  });

  const handAddPhone = async (values: InitialState) => {
    const payload = {
      phoneMake: values.phone_make,
      phoneModel: values.phone_model,
      phoneSerialNo: values.phone_serial_no,
      phoneStatus: values.phone_status,
    };

    setLoading(true);

    try {
      const response = await AppService.addPhone(payload);
      console.log(response, "response");
      setLoading(false);
      setPhoneResponse(response);
      setRegisterationTabs(2);
    } catch (error) {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: form,
    validationSchema: PhoneAllocationValidationSchema,
    onSubmit: handAddPhone,
  });

  const handleAllocatePhone = async () => {
    const payload = {
      dataCaptureAgentId: selectedAgent,
    };

    setLoading(true);
    const data = await AppService.assignPhone(payload, phoneResponse?.phoneId);
    if (data) {
      setLoading(false);
      setSuccess(true);
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
            <AppText text="Phone Allocation" style={style.title} />
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
                    text="Phone Allocation Details"
                    style={style.membership_title}
                  />

                  <View style={{ gap: 25 }}>
                    {/* Phone Make */}
                    <AppSelect
                      data={[
                        { label: "Samsung", value: "Samsung" },
                        { label: "Apple", value: "Apple" },
                        { label: "Huawei", value: "Huawei" },
                        { label: "LG", value: "LG" },
                        { label: "Sony", value: "Sony" },
                      ]}
                      label="Phone Make"
                      onChange={(value: any) =>
                        formik.setFieldValue("phone_make", value)
                      }
                      placeholder="Select Phone Make"
                      value={formik.values.phone_make as string}
                      errorMessage={
                        formik.errors.phone_make && formik.touched.phone_make
                          ? formik.errors.phone_make
                          : null
                      }
                    />

                    {/* Phone Model */}
                    <AppTextInput
                      label="Phone Model"
                      onChangeText={(text) => {
                        formik.setFieldValue("phone_model", text);
                      }}
                      value={formik.values.phone_model}
                      onBlur={formik.handleBlur("phone_model")}
                      placeholder="Enter Phone Model (e.g., A10 Galaxy)"
                      errorMessage={
                        formik.errors.phone_model && formik.touched.phone_model
                          ? formik.errors.phone_model
                          : null
                      }
                      inputMode="text"
                      maxLength={50}
                      textInputStyle={{
                        borderColor:
                          formik.touched.phone_model &&
                          formik.errors.phone_model
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    {/* Phone Serial Number */}
                    <AppTextInput
                      label="Phone Serial Number"
                      onChangeText={(text) => {
                        formik.setFieldValue("phone_serial_no", text);
                      }}
                      value={formik.values.phone_serial_no}
                      onBlur={formik.handleBlur("phone_serial_no")}
                      placeholder="Enter Phone Serial Number"
                      errorMessage={
                        formik.errors.phone_serial_no &&
                        formik.touched.phone_serial_no
                          ? formik.errors.phone_serial_no
                          : null
                      }
                      inputMode="text"
                      maxLength={50}
                      textInputStyle={{
                        borderColor:
                          formik.touched.phone_serial_no &&
                          formik.errors.phone_serial_no
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    {/* Phone Status */}
                    <AppSelect
                      data={[
                        { label: "Active", value: "Active" },
                        { label: "Inactive", value: "Inactive" },
                        { label: "Broken", value: "Broken" },
                        { label: "Stolen", value: "Stolen" },
                        { label: "Repair", value: "Repair" },
                      ]}
                      label="Phone Status"
                      onChange={(value: any) => {
                        formik.setFieldValue("phone_status", value);
                      }}
                      placeholder="Select Phone Status"
                      value={formik.values.phone_status as string}
                      errorMessage={
                        formik.errors.phone_status &&
                        formik.touched.phone_status
                          ? formik.errors.phone_status
                          : null
                      }
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
                    {success ? (
                      <View style={{ width: "100%", gap: 10 }}>
                        <AppText
                          text="Phone Assigned Successfully!"
                          style={style.title}
                        />

                        <View style={{ flex: 1 }}>
                          <AppDarkButton
                            text="Re-Assign"
                            onPress={() => setRegisterationTabs(1)}
                          />
                        </View>
                      </View>
                    ) : (
                      <>
                        {phoneResponse && (
                          <View style={style.detailsContainer}>
                            <Details
                              title="Phone Name"
                              value={phoneResponse.phoneMake}
                            />
                            <Details
                              title="Phone Model"
                              value={phoneResponse.phoneModel}
                            />
                            <Details
                              title="Phone Serial No"
                              value={phoneResponse.phoneSerialNo}
                            />
                          </View>
                        )}

                        <View
                          style={{
                            width: "100%",
                          }}
                        >
                          <AppSelect
                            data={agents.map((agent: any) => ({
                              label: `${agent.firstName} ${agent.lastName} (${agent.userName})`,
                              value: agent.userId,
                            }))}
                            label="Select Agent"
                            onChange={(value: any) => {
                              setSelectedAgent(value);
                            }}
                            placeholder="Select an Agent"
                            value={selectedAgent ?? ""}
                          />
                        </View>

                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <AppDarkButton
                              text="Back"
                              onPress={() => setRegisterationTabs(1)}
                            />
                          </View>

                          <View style={{ flex: 1 }}>
                            <AppDarkButton
                              text="Assign Phone"
                              disabled={loading}
                              loading={loading}
                              onPress={() => handleAllocatePhone()}
                            />
                          </View>
                        </View>
                      </>
                    )}
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

export default PhoneAllocationScreen;

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
