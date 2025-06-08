import React from "react";
import {
	View,
	Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useThemeColors } from "@/hooks/useThemeColors";
import GradientCard from "@/components/core/GradientCard";

export interface FeatureCardProps {
	title: string;
	description: string;
	icon: keyof typeof MaterialIcons.glyphMap;
	credits?: number;
	onPress?: () => void;
	gradient?: readonly [string, string, ...string[]];
	disabled?: boolean;
}

const FeaturedCard: React.FC<FeatureCardProps> = ({
	title,
	description,
	icon,
	credits,
	onPress,
	gradient,
	disabled = false,
}) => {
	const colors = useThemeColors();

	return (
		<GradientCard
			gradientColors={gradient || [colors.card, colors.surface] as readonly [string, string, ...string[]]}
			disabled={disabled}
			style={{ width: "48%", marginBottom: 16 }}
		>
			<View className="items-center mb-4">
				<MaterialIcons
					name={icon}
					size={40}
				/>
			</View>
			<View className="items-center">
				<Text className="text-lg font-semibold text-center mb-2 text-gray-800 dark:text-white">{ title }</Text>
				<Text className="text-center text-gray-600 dark:text-gray-300 text-sm">{ description }</Text>
				{ credits !== undefined && (
					<Text
						style={{ color: colors.primary }}
						className="text-center text-sm mt-2"
					>{ credits } credits</Text>
				) }
			</View>
		</GradientCard>
	);
}

export default FeaturedCard;

