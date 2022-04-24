import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

const GameOverScreen = ({ onRestart, roundsNumber, userNumber }) => {
	return (
		<View style={styles.screen}>
			<TitleText style={{}}>The Game is Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require("../assets/success.png")} />
			</View>

			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
				</BodyText>
			</View>

			<MainButton onPress={onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	imageContainer: {
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		width: 300,
		height: 300,
		overflow: "hidden",
		marginVertical: 30,
	},

	image: {
		borderRadius: 200,
		width: "100%",
		height: "100%",
	},

	highlight: {
		color: colors.primary,
		fontFamily: "open-sans-bold",
	},

	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
	},

	resultText: {
		textAlign: "center",
		fontSize: 20,
	},
});

export default GameOverScreen;
