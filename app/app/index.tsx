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

type Feature = {
    icon: string;
    text: string;
    description: string;
};

const features: Feature[] = [

];

const WelcomeScreen = () => {
    return (
        <div>

        </div>
    );
};

export default WelcomeScreen;
