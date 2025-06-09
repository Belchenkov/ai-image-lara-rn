import { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { useSession } from "@/context/AuthContext";
import axiosInstance from "@/config/axiosConfig";
import FeaturedCard from "@/components/app/FeatureCard";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Index() {
	const { user } = useSession();
	const colors = useThemeColors();
	const [operationCredits, setOperationCredits] = useState<Record<string, number>>({});

	useEffect(() => {
		const fetchOperationCredits = async () => {
			try {
				const response = await axiosInstance.get('/api/operations/credits');
				setOperationCredits(response.data.operations);
			} catch (error) {
				console.error('Failed to fetch operation credits: ', error);
			}
		};

		fetchOperationCredits().then();
	});

	const cards = [
		{
			title: "Generative Fill",
			description: "Expand your images with AI-generated content",
			icon: 'auto-fix-high',
			route: '/generative-fill',
			operationType: 'generative_fill',
		},
		{
			title: "Restore Images",
			description: "Enhance and restore old or damaged photos",
			icon: 'restore',
			route: '/restore',
			operationType: 'restore',
		},
		{
			title: "Recolor Images",
			description: "Transform image colors using AI",
			icon: 'palette',
			route: '/recolor',
			operationType: 'recolor',
		},
		{
			title: "Remove Objects",
			description: "Remove unwanted objects from images",
			icon: 'content-cut',
			route: '/remove',
			operationType: 'remove_object',
		},
	];

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
			<ScrollView className="flex-1">
				<View className="p-4">
					<View className="flex flex-row justify-between items-center mb-6">
						<Text className="text-2xl font-bold text-gray-800 dark:text-white">
							Welcome, {user?.name}
						</Text>

						<TouchableOpacity
							className="flex-row items-center"
							// @ts-ignore
							onPress={() => router.push('/credits')}
						>
							<MaterialIcons
								name="stars"
								size={24}
								color={colors.primary}
								style={{ marginRight: 8 }}
							/>
							<Text className="text-2xl font-bold text-gray-800 dark:text-white">
								{ user?.credits || 0 } Credits
							</Text>
						</TouchableOpacity>
					</View>

					<View className="flex-row flex-wrap justify-between mb-6">
						{ cards.map((card) => (
							<FeaturedCard
								key={card.title}
								title={card.title}
								description={card.description}
								icon={card.icon as keyof typeof MaterialIcons.glyphMap}
								gradient={[
									colors.card,
									colors.surface,
								] as readonly [string, string, ...string[]]}
								credits={operationCredits[card.operationType]}
								onPress={() => router.push(card.route as any)}
							/>
						)) }
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
