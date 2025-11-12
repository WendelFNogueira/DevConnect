import React from "react";
import { View, Text, ImageBackground, ScrollView } from "react-native";
import { useTheme } from "../utils/theme";

export default function AboutScreen() {
  const { theme, mode } = useTheme();

  return (
    <ImageBackground
      source={{
        uri:
          mode === "dark"
            ? "https://source.unsplash.com/featured/?technology,dark"
            : "https://source.unsplash.com/featured/?technology,light",
      }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor:
            mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
        }}
      >
        <Text style={{ fontSize: 18, color: theme.text }}>
          Sobre o DevConnect
        </Text>
        <Text style={{ marginTop: 10, color: theme.text }}>
          DevConnect é um app criado para ajudar estudantes a aprenderem React
          Native na prática. Ele combina funcionalidades sociais, temas,
          navegação e boas práticas!
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}
