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
import { useAppSelector } from "../redux/hooks/hooks";
import { AppSelect } from "../components/select/appselect";
import AppService from "../services/app.service";

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

function PosAllocationScreen(): JSX.Element {
  const [registerationTabs, setRegisterationTabs] = useState<number>(1); // Local state for tabs
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [posResponse, setPosResponse] = useState<any>(null);
  const [agents, setAgents] = useState<any>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

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

  const formik = useFormik({
    initialValues: {
      pos_make: "",
      pos_model: "",
      pos_serial_no: "",
      pos_status: "",
    },
    validationSchema: Yup.object().shape({
      pos_make: Yup.string().required("POS Make is required"),
      pos_model: Yup.string().required("POS Model is required"),
      pos_serial_no: Yup.string().required("POS Serial Number is required"),
      pos_status: Yup.string().required("POS Status is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        posMake: values.pos_make,
        posModel: values.pos_model,
        posSerialNo: values.pos_serial_no,
        posStatus: values.pos_status,
      };
      try {
        const response = await AppService.addPOS(payload);
        if (response) {
          setPosResponse(response);
          setRegisterationTabs(2);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleAllocatePOS = async () => {
    setLoading(true);
    const payload = {
      dataCaptureAgentId: selectedAgent,
    };

    try {
      const response = await AppService.assignPos(
        payload,
        posResponse?.data?.posId
      );
      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error assigning POS:", error);
    } finally {
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
            <AppText text="POS Allocation" style={style.title} />
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
                    text="POS Allocation Details"
                    style={style.membership_title}
                  />

                  <View style={{ gap: 25 }}>
                    {/* POS Make */}
                    <AppSelect
                      data={[
                        { label: "PAX Technology", value: "PAX Technology" },
                        {
                          label: "VeriFone Systems",
                          value: "VeriFone Systems",
                        },
                        { label: "Ingenico", value: "Ingenico" },
                        {
                          label: "Newland Payment Technology",
                          value: "Newland Payment Technology",
                        },
                        { label: "Ingenico", value: "Ingenico" },
                        { label: "Epson", value: "Epson" },
                        { label: "Clover Network", value: "Clover Network" },
                        { label: "Square", value: "Square" },
                        { label: "Toast", value: "Toast" },
                        { label: "Lightspeed", value: "Lightspeed" },
                        { label: "Shopify POS", value: "Shopify POS" },
                      ]}
                      label="POS Make"
                      onChange={(value) =>
                        formik.setFieldValue("pos_make", value)
                      }
                      placeholder="Select POS Make"
                      value={formik.values.pos_make}
                      errorMessage={
                        formik.errors.pos_make && formik.touched.pos_make
                          ? formik.errors.pos_make
                          : ""
                      }
                    />

                    {/* POS Model */}
                    <AppTextInput
                      label="POS Model"
                      onChangeText={(text) =>
                        formik.setFieldValue("pos_model", text)
                      }
                      value={formik.values.pos_model}
                      onBlur={formik.handleBlur("pos_model")}
                      placeholder="Enter POS Model"
                      errorMessage={
                        formik.errors.pos_model && formik.touched.pos_model
                          ? formik.errors.pos_model
                          : ""
                      }
                      inputMode="text"
                      maxLength={50}
                      textInputStyle={{
                        borderColor:
                          formik.touched.pos_model && formik.errors.pos_model
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    {/* POS Serial Number */}
                    <AppTextInput
                      label="POS Serial Number"
                      onChangeText={(text) =>
                        formik.setFieldValue("pos_serial_no", text)
                      }
                      value={formik.values.pos_serial_no}
                      onBlur={formik.handleBlur("pos_serial_no")}
                      placeholder="Enter POS Serial Number"
                      errorMessage={
                        formik.errors.pos_serial_no &&
                        formik.touched.pos_serial_no
                          ? formik.errors.pos_serial_no
                          : ""
                      }
                      inputMode="text"
                      maxLength={50}
                      textInputStyle={{
                        borderColor:
                          formik.touched.pos_serial_no &&
                          formik.errors.pos_serial_no
                            ? AppColorConstants.app_dark
                            : "#D9D9D9",
                      }}
                    />

                    {/* POS Status */}
                    <AppSelect
                      data={[
                        { label: "Active", value: "Active" },
                        { label: "Inactive", value: "Inactive" },
                        { label: "Broken", value: "Broken" },
                        { label: "Stolen", value: "Stolen" },
                        { label: "Repair", value: "Repair" },
                      ]}
                      label="POS Status"
                      onChange={(value) =>
                        formik.setFieldValue("pos_status", value)
                      }
                      placeholder="Select POS status"
                      value={formik.values.pos_status}
                      errorMessage={
                        formik.errors.pos_status && formik.touched.pos_status
                          ? formik.errors.pos_status
                          : ""
                      }
                    />

                    <View style={{ marginTop: "10%" }}>
                      <AppDarkButton
                        text="Submit"
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
                    {success ? ( // Show success message if success state is true
                      <View style={{ width: "100%", gap: 10 }}>
                        <AppText
                          text="POS Assigned Successfully!"
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
                        {posResponse && (
                          <View style={style.detailsContainer}>
                            <Details
                              title="POS Name"
                              value={posResponse.posMake}
                            />
                            <Details
                              title="POS Model"
                              value={posResponse.posModel}
                            />
                            <Details
                              title="POS Serial No"
                              value={posResponse.posSerialNo}
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
                              text="Assign POS"
                              disabled={loading}
                              loading={loading}
                              onPress={() => handleAllocatePOS()}
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
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

export default PosAllocationScreen;

const style = StyleSheet.create({
  root: {
    ...StyleConstants.container,
  },

  membership_title: {
    fontSize: 24,
    // fontFamily
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: -0.2,
    color: AppColorConstants.app_dark,
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
