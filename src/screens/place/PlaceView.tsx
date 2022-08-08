import React from "react";
import { View } from "react-native";
import { HospitalBuilding } from "../../assets/icons";
import { PageTitle } from "../../components";

type TPlace = {
  styles: any;
};

export function PlaceView({
  styles,
}: TPlace) {
  return (
    <View style={styles.container}>
      <PageTitle title="Locais" icon={<HospitalBuilding />} />
    </View>
  )
}
