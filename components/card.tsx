import { Text } from "@react-navigation/elements";
import { View } from "react-native-reanimated/lib/typescript/Animated";

type PropsType = {
  title: string;
  hour: Date;
  description: string;
  prie: number;
  name: string;
};

export default function Card(props: PropsType) {
  const { title, hour, description, prie, name } = props;

  return (
    <View>
      <Text>Card Component</Text>
    </View>
  );
}
