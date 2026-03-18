import { Text } from "@react-navigation/elements";
import { View } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
      <Text>
        Settings Component: allow users to configure their preferences
      </Text>
    </View>
  );
}
