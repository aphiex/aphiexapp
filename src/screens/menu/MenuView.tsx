import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { Account, CardAccountDetails, FolderPlus, HospitalBuilding, Logo, Settings } from "../../assets/icons";
import { IconButton } from "../../components";


type TMenu = {
  styles: any;
  navigation: NativeStackNavigationProp<any, any, undefined>
};

export function MenuView({
  navigation,
  styles,
}: TMenu) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Menu Principal</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.columnSpace}>
            <IconButton
              title="Perfil"
              icon={<Account size={70} />}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
          <View style={styles.columnSpace}>
            <IconButton
              title="Locais"
              icon={<HospitalBuilding size={70} />}
              onPress={() => navigation.navigate('Place')}
            />
          </View>
          <IconButton
            title="Configurações"
            icon={<Settings size={70} />}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <View style={styles.column}>
          <View style={styles.columnSpace}>
            <IconButton
              title="Exames"
              icon={<FolderPlus size={70} />}
              onPress={() => navigation.navigate('Exam')}
            />
          </View>
          <IconButton
            title="Médicos"
            icon={<CardAccountDetails size={70} />}
            onPress={() => navigation.navigate('Doctor')}
          />
        </View>
      </View>
    </View>
  )
}
