import { Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";

export default function Index() {
    const { currentTheme } = useTheme();

    return (
    <View
      className={`flex-1 items-center justify-center` + (
          currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
      )}
    >
      <Text className='text-yellow-800'>App/index.tsx to edit this screen.</Text>
    </View>
    );
}
