import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../utils/theme";

export default function PostItem({ item, onLike }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.post, { borderBottomColor: theme.border }]}>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <Text style={[styles.text, { color: theme.text }]}>{item.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike} style={styles.likeButton}>
          <Icon name="thumb-up" size={20} color={theme.primary} />
        </TouchableOpacity>
        <Text style={{ color: theme.subtle }}>{item.likes} curtidas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 10,
    borderBottomWidth: 1,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  likeButton: {
    padding: 4,
  },
});
