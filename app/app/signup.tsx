import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	Alert,
	ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import axios from "axios";

import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import axiosInstance from "@/config/axiosConfig";
import { useTheme } from "@/context/ThemeContext";

const Signup = () => {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});
	const { currentTheme } = useTheme();
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const handleChange = (key: string, value: string) => {
		setData({ ...data, [key]: value });
	};

	const handleSignup = async () => {
		setLoading(true);
		setErrors({
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		});

		try {
			await axiosInstance.post('/api/register', data);

			resetForm();
			setSuccessMessage('Account created successfully! Please check your email to verify your account.');
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
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		});
		setErrors({
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
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
				Sign up
			</Text>

			{ !!successMessage && (
				<Text className='bg-emerald-600 text-white rounded-lg py-3 px-4 mb-4'>{successMessage}</Text>
			) }

			<Input
				placeholder="Name"
				value={data.name}
				onChangeText={value => handleChange('name', value)}
				error={errors?.name}
			/>
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
			<Input
				placeholder="Confirm Password"
				value={data.password_confirmation}
				onChangeText={value => handleChange('password_confirmation', value)}
				secureTextEntry
			/>

			<Button
				className="w-full bg-primary mb-4 py-3"
				onPress={handleSignup}
				disabled={loading}
				loading={loading}
			>
				<View className="flex-row items-center justify-center">
					<Text className='text-white text-center'>Sign Up</Text>
				</View>
			</Button>

			<Text className={`text-lg ${currentTheme === 'dark' ? 'text-gray-400': 'text-gray-600'} mt-5`}>
				Already have an account?{' '}
				<Link href='/sign-in'>
					<Text className='text-primary'>Sign In</Text>
				</Link>
			</Text>
		</View>
	);
};

export default Signup;
