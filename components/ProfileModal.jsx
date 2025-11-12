import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileModal({
  visible,
  onClose,
  avatar,
  pickImage,
  name,
  status,
  setName,
  setStatus,
}) {
  const { theme } = useTheme();
  const [tempName, setTempName] = useState(name);
  const [tempStatus, setTempStatus] = useState(status);
  const [nameFocused, setNameFocused] = useState(false);
  const [statusFocused, setStatusFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTempName(name);
    setTempStatus(status);
  }, [name, status]);

  const handleSave = async () => {
    if (!tempName.trim()) {
      return Alert.alert("Aviso", "Nome não pode estar vazio.");
    }

    try {
      setIsSaving(true);
      await AsyncStorage.setItem("@name", tempName);
      await AsyncStorage.setItem("@status", tempStatus);
      setName(tempName);
      setStatus(tempStatus);
      onClose();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as informações.");
    } finally {
      setIsSaving(false);
    }
  };

  const placeholderColor = theme.placeholder || "#888";

  const getInputStyle = (focused) => [
    styles.input,
    {
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: focused ? theme.primary : "#ccc",
      borderWidth: 1,
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.modalBox, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.modalText, { color: theme.text }]}>
            Foto de Perfil
          </Text>

          <Image source={{ uri: avatar }} style={styles.avatar} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={pickImage}
            accessibilityLabel="selecionar-foto"
          >
            <Text style={styles.buttonText}>Selecionar nova foto</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome"
            value={tempName}
            onChangeText={setTempName}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            style={getInputStyle(nameFocused)}
            placeholderTextColor={placeholderColor}
            accessibilityLabel="input-nome"
          />

          <TextInput
            placeholder="Status"
            value={tempStatus}
            onChangeText={setTempStatus}
            onFocus={() => setStatusFocused(true)}
            onBlur={() => setStatusFocused(false)}
            style={getInputStyle(statusFocused)}
            placeholderTextColor={placeholderColor}
            accessibilityLabel="input-status"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.button,
                { backgroundColor: theme.primary, flex: 1, marginRight: 5 },
              ]}
              accessibilityLabel="botao-cancelar"
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.button,
                { backgroundColor: theme.primary, flex: 1, marginLeft: 5 },
              ]}
              disabled={isSaving}
              accessibilityLabel="botao-salvar"
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
    marginBottom: 15,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
