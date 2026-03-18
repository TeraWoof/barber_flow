import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

// 1. Importa o teu Provider e o Modal
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppointmentForm } from "../components/appointmentForm";
import { AppProvider } from "./context/AppContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // 2. O ModalProvider deve envolver TUDO
    <AppProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>

        {/* 3. Renderiza o Modal aqui para ele ser global */}
        <AppointmentForm />

        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
