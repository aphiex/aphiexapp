import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context";
import PrivateStack from "./PrivateStack";
import PublicStack from "./PublicStack";

export function Router() {
  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {auth && auth?.authorized ? <PrivateStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
