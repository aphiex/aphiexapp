import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from "../../styles/theme";

type TLock = {
  size?: number;
  color?: string;
}

export const EyeOffOutline: React.FC<TLock> = ({
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