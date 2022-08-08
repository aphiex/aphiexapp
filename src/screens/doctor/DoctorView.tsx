import React from "react";
import { View } from "react-native";
import { CardAccountDetails } from "../../assets/icons";
import { PageTitle } from "../../components";

type TDoctor = {
  styles: any;
};

export function DoctorView({
  styles,
}: TDoctor) {
  return (
    <View style={styles.container}>
      <PageTitle title="Médicos" icon={<CardAccountDetails />} />
    </View>
  )
}
