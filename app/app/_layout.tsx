import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../global.css";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { SessionProvider, useSession } from "@/context/AuthContext";

const Header = () => {
  const { currentTheme } = useTheme();
  const { session, isLoading } = useSession();

  // If we have a session and we're not on the welcome screen, redirect to the app
  if (session && !isLoading) {
      return (
        <>
          <StatusBar
            style={currentTheme === 'dark' ? 'light': 'dark'}
            backgroundColor={currentTheme === 'dark' ? '#111827' : '#ffffff'}
          />
          <Redirect href='/(app)/(tabs)' />
        </>
    );
  }

  return (
      <StatusBar
          style={currentTheme === 'dark' ? 'light': 'dark'}
          backgroundColor={currentTheme === 'dark' ? '#111827' : '#ffffff'}
      />
  );
};

export default function RootLayout() {
  return <SessionProvider>
    <ThemeProvider>
      <Header />
      <Slot />
    </ThemeProvider>
  </SessionProvider>;
}
