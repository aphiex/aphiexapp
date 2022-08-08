import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from "../../styles/theme";
import { TIconProps } from ".";

export const EyeOffOutline: React.FC<TIconProps> = ({
  size = 64,
  color = `${theme.colors.primary}`,
}) => {
  return (
    <MaterialCommunityIcons
      name='eye-off-outline'
      size={size}
      color={color}
    />
  );
};