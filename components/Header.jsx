import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../utils/theme";

export default function Header({ name, status, avatar }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.status, { color: theme.subtle }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 16 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
  },

  name: { fontSize: 20, fontWeight: "bold" },
  status: { fontSize: 14 },
});
