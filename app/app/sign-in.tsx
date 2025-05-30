import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	Alert,
	ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";

import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import axiosInstance from "@/config/axiosConfig";
import { useTheme } from "@/context/ThemeContext";
import { useSession } from "@/context/AuthContext";

const Login = () => {
	const { signIn } = useSession();
	const { currentTheme } = useTheme();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const handleChange = (key: string, value: string) => {
		setData({...data, [key]: value});
	};

	const handleLogin = async () => {
		setLoading(true);
		setErrors({
			email: '',
			password: '',
		});

		try {
			const response = await axiosInstance.post('/api/login', data);

			await signIn(response.data.token, response.data.user);

			resetForm();
			router.replace("/");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const responseData = error.response?.data;

				if (responseData?.error) {
					setErrors(responseData?.error);
				} else if (responseData?.message) {
					Alert.alert('Error', responseData?.message);
				} else {
					Alert.alert('Error', 'An unexpected error occurred. Please try again.');
				}
			} else {
				console.error('Error', error);
				Alert.alert('Error', 'Unable to connect to the server.');
			}
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setData({
			email: '',
			password: '',
		});
		setErrors({
			email: '',
			password: '',
		});
	};

	return (
		<View className={`flex-1 justify-center items-center p-5 ${currentTheme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
			<View className="items-center mb-8">
				<Image
					source={require("../assets/images/landing.png")}
					className='w-32 h-32'
					resizeMode="contain"
				/>
				<Text className={`text-2xl font-bold mt-4 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
					Imaginary
				</Text>
			</View>

			<Text className={`text-3xl font-bold mb-5 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
				Login
			</Text>

			<Input
				placeholder="Email"
				value={data.email}
				onChangeText={value => handleChange('email', value)}
				keyboardType="email-address"
				error={errors?.email}
			/>
			<Input
				placeholder="Password"
				value={data.password}
				onChangeText={value => handleChange('password', value)}
				secureTextEntry
				error={errors?.password}
			/>

			<Button
				className="w-full bg-primary mb-4 py-3"
				onPress={handleLogin}
				disabled={loading}
				loading={loading}
			>
				<View className="flex-row items-center justify-center">
					<Text className='text-white text-center'>Login</Text>
				</View>
			</Button>

			<Text className={`text-lg ${currentTheme === 'dark' ? 'text-gray-400': 'text-gray-600'} mt-5`}>
				Don't have an account?{' '}
				<Link href='/signup'>
					<Text className='text-primary'>Sign Up</Text>
				</Link>
			</Text>
		</View>
	);
};

export default Login;
