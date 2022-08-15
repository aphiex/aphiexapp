import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from "../../styles/theme";
import { TIconProps } from ".";

export const Plus: React.FC<TIconProps> = ({
  size = 64,
  color = `${theme.colors.primary}`,
}) => {
  return (
    <MaterialCommunityIcons
      name='plus'
      size={size}
      color={color}
    />
  );
};