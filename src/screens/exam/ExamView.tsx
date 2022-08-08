import React from "react";
import { View } from "react-native";
import { FolderPlus } from "../../assets/icons";
import { PageTitle } from "../../components";

type TExam = {
  styles: any;
};

export function ExamView({
  styles,
}: TExam) {
  return (
    <View style={styles.container}>
      <PageTitle title="Exames" icon={<FolderPlus />} />
    </View>
  )
}
