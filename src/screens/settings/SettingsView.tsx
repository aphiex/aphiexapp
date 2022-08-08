import React from "react";
import { View } from "react-native";
import { Settings } from "../../assets/icons";
import { PageTitle } from "../../components";

type TSettings = {
  styles: any;
};

export function SettingsView({
  styles,
}: TSettings) {
  return (
    <View style={styles.container}>
      <PageTitle title="Configurações" icon={<Settings />} />
    </View>
  )
}
