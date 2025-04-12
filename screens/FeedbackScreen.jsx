import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useTheme } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState("");
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleSendFeedback = async () => {
    if (feedback.trim().length === 0) {
      Alert.alert("Por favor, escreva algo antes de enviar.");
      return;
    }

    const timestamp = new Date().toISOString();
    const savedFeedback = { message: feedback, date: timestamp };

    try {
      const existing = await AsyncStorage.getItem("feedbacks");
      const feedbacks = existing ? JSON.parse(existing) : [];
      feedbacks.push(savedFeedback);
      await AsyncStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    } catch (error) {
      console.log("Erro ao salvar o feedback:", error);
    }

    Alert.alert("Obrigado pelo feedback!", "", [
      {
        text: "OK",
        onPress: () => navigation.navigate("DevConnect"),
      },
    ]);

    setFeedback("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ fontSize: 18, color: theme.text }}>
        Deixe seu feedback:
      </Text>
      <TextInput
        placeholder="Digite aqui..."
        multiline
        numberOfLines={4}
        value={feedback}
        onChangeText={setFeedback}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderWidth: 1,
          borderColor: theme.primary,
          borderRadius: 8,
          padding: 10,
          marginVertical: 10,
          textAlignVertical: "top",
        }}
        placeholderTextColor={theme.text}
      />
      <Button
        title="Enviar"
        onPress={handleSendFeedback}
        color={theme.primary}
      />
    </View>
  );
}
