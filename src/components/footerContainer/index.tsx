import React, { ReactElement, useEffect, useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import theme from '../../styles/theme';
import { CustomButton } from '../customButton';
import { IconButton } from '../iconButton';

type TFooterContainer = {
  btnLeftTitle?: string;
  btnLeftOnPress?: () => void;
  btnLeftVariant?: 'primary' | 'secondary';
  btnLeftIcon?: ReactElement;
  btnLeftDisabled?: boolean;

  btnMiddleTitle?: string;
  btnMiddleOnPress?: () => void;
  btnMiddleVariant?: 'primary' | 'secondary';
  btnMiddleIcon?: ReactElement;
  btnMiddleDisabled?: boolean;

  btnRightTitle?: string;
  btnRightOnPress?: () => void;
  btnRightVariant?: 'primary' | 'secondary';
  btnRightIcon?: ReactElement;
  btnRightDisabled?: boolean;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${theme.colors.white}`,
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: `${theme.colors.softGray}`,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: `${theme.fonts.medium500}`,
    color: `${theme.colors.black}`,
    fontSize: 14,
    textAlign: 'center',
  },
})

export function FooterContainer({
  btnLeftTitle,
  btnLeftVariant,
  btnLeftIcon,
  btnLeftDisabled = false,
  btnLeftOnPress,
  btnMiddleTitle,
  btnMiddleVariant,
  btnMiddleIcon,
  btnMiddleDisabled = false,
  btnMiddleOnPress,
  btnRightTitle,
  btnRightVariant,
  btnRightIcon,
  btnRightDisabled = false,
  btnRightOnPress,
}: TFooterContainer) {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, {
      display: keyboardVisible ? 'none' : 'flex',
    }]}>
      {btnLeftTitle ? (
        <CustomButton
          title={btnLeftTitle}
          onPress={btnLeftOnPress}
          variant={btnLeftVariant}
          disabled={btnLeftDisabled}
          icon={btnLeftIcon}
        />
      ) : (<View />)}
      {btnMiddleTitle && btnMiddleIcon && (
        <IconButton
          title={btnMiddleTitle}
          onPress={btnMiddleOnPress}
          variant={btnMiddleVariant}
          disabled={btnMiddleDisabled}
          icon={btnMiddleIcon}
        />
      )}
      {btnRightTitle ? (
        <CustomButton
          title={btnRightTitle}
          onPress={btnRightOnPress}
          variant={btnRightVariant}
          disabled={btnRightDisabled}
          icon={btnRightIcon}
        />
      ) : (<View />)}
    </View>
  )
}
