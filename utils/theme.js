import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "./colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(null);
  const [useSystemTheme, setUseSystemTheme] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      const storedUseSystem = await AsyncStorage.getItem("useSystemTheme");

      if (storedUseSystem === "false") {
        setUseSystemTheme(false);
        setDarkMode(storedDarkMode === "true");
      } else {
        setUseSystemTheme(true);
        setDarkMode(systemTheme === "dark");
      }
    };

    loadTheme();
  }, [systemTheme]);

  useEffect(() => {
    if (darkMode !== null) {
      AsyncStorage.setItem("darkMode", String(darkMode));
      AsyncStorage.setItem("useSystemTheme", String(useSystemTheme));
    }
  }, [darkMode, useSystemTheme]);

  if (darkMode === null) return null;

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        useSystemTheme,
        setUseSystemTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
