import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useThemeColors } from "@/hooks/useThemeColors";
import { useTheme } from "@/context/ThemeContext";

type Feature = {
    icon: string;
    text: string;
    description: string;
};

const features: Feature[] = [
    {
        icon: '&#127912;',
        text: 'Recolor Images',
        description: 'Choose Arbitrary Color',
    },
    {
        icon: '&#128247;',
        text: 'Restore Photos',
        description: 'In Excellent Quality',
    },
    {
        icon: '&#10024;',
        text: 'Generative Fill',
        description: 'Smart Expand',
    },
    {
        icon: '&#9988;',
        text: 'Remove Objects',
        description: 'Clean removal',
    }
];

const WelcomeScreen = () => {
    const colors = useThemeColors();
    const { currentTheme } = useTheme();

    return (
        <SafeAreaView className={`flex-1 ${currentTheme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <View className="items-center px-5 pt-10">
                <Image
                    source={require("../assets/images/landing.png")}
                    className="w-[120px] h-[120px] mb-6"
                    resizeMode="contain"
                />
                <Text className={`text-[28px] font-bold text-center mb-3 ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Imaginary
                </Text>
                <Text className={`text-base text-center mb-10 leading-6 ${currentTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Transform your images with powerful AI tools - recolor, restore, fill, and remove objects with just
                    a few taps
                </Text>
                <View className="flex-row flex-wrap justify-between mb-[30px] px-[5px]">
                    {
                        features.map((features, index) => (
                            <View
                                key={index}
                                className={`w-[48%] rounded-2xl p-4 mb-4 ${currentTheme === "dark" ? "bg-gray-800" : "text-gray-100"}`}
                            >
                                <Text className="text-[36px] mb-3">
                                    {features.icon}
                                </Text>
                                <View className="w-full">
                                    <Text className={`text-[18px] font-semibold mb-1`}>
                                        {features.text}
                                    </Text>
                                    <Text className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {features.description}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>

            <View className="p-5 w-full">
                <TouchableOpacity
                    className="h-[54px] rounded-xl border-[1.5px] justify-center items-center mb-4"
                    style={{ borderColor: colors.primary }}
                    onPress={() => router.push("/sign-in")}
                >
                    <Text
                        className="text-base font-semibold"
                        style={{ color: colors.primary }}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>

                <LinearGradient
                    colors={[
                        '#4f46e5',
                        '#7c3aed',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 12,
                        marginBottom: 16,
                        height: 54,
                    }}
                >
                    <TouchableOpacity
                        className="h-[54px] justify-center items-center"
                        onPress={() => router.push("/signup")}
                    >
                        <Text className="text-base font-semibold text-white">
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

                <Text className={`text-center text-sm mt-2 ${currentTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Start transforming your images today
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
