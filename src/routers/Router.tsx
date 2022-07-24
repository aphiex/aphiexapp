import { NavigationContainer } from "@react-navigation/native";
import PrivateStack from "./PrivateStack";
import PublicStack from "./PublicStack";

export function Router(){
  const auth: boolean = true;
  return(
    <NavigationContainer>
     {auth ? <PrivateStack/> : <PublicStack/>}
    </NavigationContainer>
  );
}
