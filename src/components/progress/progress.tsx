import { StyleSheet, View } from "react-native";

import AppProgress from "../../assets/svg/progress";

const Progress = ({ step = 1 }: ProgressProps): JSX.Element => {
  return (
    <>
      <View style={style.progress}>
        <View style={{ flex: 1, width: "100%" }}>
          <AppProgress active={step === 1} />
        </View>

        <View style={{ flex: 1, width: "100%" }}>
          <AppProgress active={step === 2} />
        </View>
      </View>
    </>
  );
};

export { Progress };

const style = StyleSheet.create({
  progress: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    gap: 10,
  },
});
