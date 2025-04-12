import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useTheme } from "../utils/theme";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function PostModal({ visible, onClose, onPost }) {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const clearFields = () => {
    setText("");
    setImageUri(null);
  };

  const handlePost = () => {
    if (!text && !imageUri) {
      Alert.alert(
        "Oops!",
        "Você precisa escrever algo ou escolher uma imagem."
      );
      return;
    }

    onPost({ text, image: imageUri });
    clearFields();
    onClose();
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir o acesso à galeria."
      );
      return;
    }

    const mediaTypes =
      Platform.OS === "ios"
        ? ImagePicker.MediaTypeOptions.Images.toLocaleLowerCase()
        : [ImagePicker.MediaTypeOptions.Images.toLocaleLowerCase()];

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão negada",
        "Você precisa permitir o acesso à câmera."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboardView}
          >
            <View
              style={[styles.modalContainer, { backgroundColor: theme.card }]}
            >
              <Text style={[styles.title, { color: theme.text }]}>
                Criar Post
              </Text>

              <TextInput
                placeholder="Escreva algo..."
                placeholderTextColor={theme.subtle}
                multiline
                value={text}
                onChangeText={setText}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit
                style={[
                  styles.input,
                  { color: theme.text, borderColor: theme.border },
                ]}
              />

              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              )}

              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={pickImageFromGallery}
                  style={styles.iconBtn}
                >
                  <Icon name="image-outline" size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={takePhotoWithCamera}
                  style={styles.iconBtn}
                >
                  <Icon name="camera-outline" size={24} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Postar
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={{ color: theme.subtle }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    marginBottom: 12,
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBtn: {
    padding: 10,
  },
  postBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeBtn: {
    marginTop: 10,
    alignItems: "center",
  },
  keyboardView: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
