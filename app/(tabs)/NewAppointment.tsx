import { Text } from "@react-navigation/elements";
import { View } from "react-native";

export default function NewAppointment() {
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
      <Text>
        New Appointment Component: allow users to schedule new appointments
      </Text>
    </View>
  );
}
