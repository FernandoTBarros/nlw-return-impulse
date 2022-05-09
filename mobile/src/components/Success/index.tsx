import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';
import { styles } from './styles';

interface Props {
	onFeedbackReset: () => void;
}

export function Success({ onFeedbackReset }: Props) {
	return (
		<TouchableOpacity style={styles.container}>
			<Image source={successImg}
				style={styles.image} />
			<Text style={styles.title}>
				Agradecemos o feedback
			</Text>
			<TouchableOpacity onPress={onFeedbackReset} style={styles.button}>
				<Text style={styles.buttonTitle}>
					Quero enviar outro
				</Text>
			</TouchableOpacity>

			<Copyright />
		</TouchableOpacity >
	);
}