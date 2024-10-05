import * as React from 'react';
import Svg, {SvgProps, Rect, Circle} from 'react-native-svg';

interface RadioIconProps extends SvgProps {
  filled: string;
  filledActive: string;
}

const RadioIcon = ({
  filled = '#FFFFFF',
  filledActive = '#D9D9D9',
  ...props
}: RadioIconProps) => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Rect width={15} height={15} x={0.847} y={0.687} fill="#F9F5FF" rx={7.5} />
    <Rect
      width={15}
      height={15}
      x={0.847}
      y={0.687}
      stroke={filledActive}
      rx={7.5}
    />
    <Circle cx={8.347} cy={8.187} r={5} fill={filled} />
  </Svg>
);
export default RadioIcon;
