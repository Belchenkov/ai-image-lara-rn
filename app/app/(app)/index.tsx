import React from "react";
import { View, Text, Alert, Platform } from "react-native";

import { useSession } from "@/context/AuthContext";
import Button from "@/components/core/Button";

const Main = () => {
	const { user, signOut } = useSession();

	const handleLogout = () => {
		if (Platform.OS === "web") {
			// For web browsers
			if (window.confirm('Are you sure you want to logout?')) {
				signOut();
			}
		} else {
			// For mobile devices
			Alert.alert(
				'Logout',
				'Are you sure you want to logout?',
				[
					{
						text: 'Cancel',
						style: 'cancel',
					},
					{
						text: 'Logout',
						style: 'destructive',
						onPress: () => signOut(),
					}
				],
				{ cancelable: true },
			);
		}
	};

	return (
		<View>
			<Text>Welcome, { user?.name }</Text>

			<Button
				className="rounded-2xl shadow-lg"
				variant="danger"
				onPress={handleLogout}
			>
				<Text className="text-white text-center font-semibold">Logout</Text>
			</Button>
		</View>
	);
};

export default Main;
