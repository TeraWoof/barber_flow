import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="Agenda" />
      <Tabs.Screen name="Dashboard" />
      <Tabs.Screen name="Reports" />
      <Tabs.Screen name="Services" />
    </Tabs>
  );
}
