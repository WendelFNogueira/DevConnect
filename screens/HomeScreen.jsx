import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import Header from "../components/Header";
import PostItem from "../components/PostItem";
import ProfileModal from "../components/ProfileModal";
import ThemeToggle from "../components/ThemeToggle";
import PostModal from "../components/PostModal";
import { useTheme } from "../utils/theme";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [name, setName] = useState("Seu Nome");
  const [status, setStatus] = useState("Olá, estou usando DevConnect!");
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, []);

  const loadProfile = async () => {
    const savedName = await AsyncStorage.getItem("@name");
    const savedStatus = await AsyncStorage.getItem("@status");
    const savedAvatar = await AsyncStorage.getItem("@avatar");

    if (savedName) setName(savedName);
    if (savedStatus) setStatus(savedStatus);
    setAvatar(savedAvatar || "https://placekitten.com/200/200");
  };

  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem("posts");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        fetchPostsFromAPI();
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  };

  const savePosts = async (postsToSave) => {
    try {
      await AsyncStorage.setItem("posts", JSON.stringify(postsToSave));
    } catch (error) {
      console.error("Erro ao salvar posts:", error);
    }
  };

  const saveAvatar = async (uri) => {
    await AsyncStorage.setItem("@avatar", uri);
    setAvatar(uri);
  };

  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        saveAvatar(uri);
      }
    } catch (error) {
      console.error("Erro ao abrir galeria:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar abrir a galeria.");
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      saveAvatar(uri);
    }
  };

  const selectImageSource = () => {
    Alert.alert(
      "Selecionar imagem",
      "Escolha a origem da imagem:",
      [
        { text: "Tirar Foto", onPress: takePhotoWithCamera },
        { text: "Escolher da Galeria", onPress: pickImageFromGallery },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes++;
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleNewPost = (newPost) => {
    const updatedPosts = [
      { id: Date.now().toString(), ...newPost, likes: 0 },
      ...posts,
    ];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const fetchPostsFromAPI = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const data = await response.json();

      const newPosts = data.map((post) => ({
        id: post.id.toString(),
        text: post.title,
        image: `https://picsum.photos/400/300?random=${post.id}`,
        likes: 0,
      }));

      setPosts(newPosts);
      savePosts(newPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PostItem item={item} onLike={() => handleLike(index)} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Header name={name} status={status} avatar={avatar} />
            </TouchableOpacity>

            <ThemeToggle />

            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={() => navigation.navigate("Feedback")}
              >
                <Icon
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Enviar Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: theme.primary, marginTop: 10 },
                ]}
                onPress={() => navigation.navigate("Sobre")}
              >
                <Icon
                  name="information-circle-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Sobre o App</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListFooterComponent={
          <ProfileModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            avatar={avatar}
            name={name}
            status={status}
            setName={setName}
            setStatus={setStatus}
            pickImage={selectImageSource}
          />
        }
      />

      <PostModal
        visible={postModalVisible}
        onClose={() => setPostModalVisible(false)}
        onPost={handleNewPost}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => setPostModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  input: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
