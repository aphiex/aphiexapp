import React from "react";
import { View } from "react-native";
import { Account } from "../../assets/icons";
import { PageTitle } from "../../components";

type TProfile = {
  styles: any;
};

export function ProfileView({
  styles,
}: TProfile) {
  return (
    <View style={styles.container}>
      <PageTitle title="Acessar Perfil" icon={<Account />} />
    </View>
  )
}
