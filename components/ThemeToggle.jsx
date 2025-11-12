import React from "react";
import { View, Text, Switch } from "react-native";
import { useTheme } from "../utils/theme";

export default function ThemeToggle() {
  const { darkMode, setDarkMode, setUseSystemTheme, theme } = useTheme();

  const toggleTheme = (value) => {
    setUseSystemTheme(false);
    setDarkMode(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: theme.card,
      }}
    >
      <Text style={{ color: theme.text }}>Modo Escuro</Text>
      <Switch
        value={darkMode}
        onValueChange={toggleTheme}
        thumbColor={theme.toggleThumb}
        trackColor={{ false: theme.toggleTrack, true: theme.primary }}
      />
    </View>
  );
}
