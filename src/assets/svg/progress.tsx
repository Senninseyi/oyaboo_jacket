import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const AppProgress = ({ active, ...props }: { active: boolean }) => (
  <Svg width={"100%"} height={7} fill="none" {...props}>
    <Rect
      width={"100%"}
      height={7}
      x={0.52}
      fill={active ? "#31C859" : "#EBEBEB"}
      rx={3.5}
    />
  </Svg>
);
export default AppProgress;
