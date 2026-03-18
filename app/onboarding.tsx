import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Barber Flow!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Let's get you set up in 3 easy steps:
        </ThemedText>
        <ThemedText>1. Create an account or log in.</ThemedText>
        <ThemedText>2. Set up your profile and preferences.</ThemedText>
        <ThemedText>3. Start exploring the app!</ThemedText>
      </ThemedView>
      <ThemedView>
        <Button
          onPress={() => alert("Learn more about Barber Flow!")}
          title="Learn More"
          color="#4871f7"
          accessibilityLabel="Learn more about this purple button"
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
