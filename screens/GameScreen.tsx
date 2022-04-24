import React, { useState, useRef, useEffect } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;

	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNumber;
	}
};

const renderListItem = (listLength, itemData) => {
	return (
		<View style={styles.listItem}>
			<BodyText>#{listLength - itemData.index}</BodyText>
			<BodyText>{itemData.item}</BodyText>
		</View>
	);
};

const GameScreen = ({ userChoice, onGameOver }) => {
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const nextGuessHandler = direction => {
		if ((direction === "down" && currentGuess < userChoice) || (direction === "up" && currentGuess > userChoice)) {
			Alert.alert(`Don't lie!`, "You know that this is wrong...", [{ text: " Sorry!", style: "cancel" }]);
			return;
		}

		if (direction === "down") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(currentRound => [nextNumber.toString(), ...currentRound]);
	};

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	return (
		<View style={styles.screen}>
			<Text style={defaultStyles.title}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>

			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("down")}>
					<Ionicons name='md-remove' size={24} color='white' />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("up")}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>

			<View style={styles.listContainer}>
				<FlatList contentContainerStyle={styles.list} keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "90%",
	},

	list: {
		flexGrow: 1,
		justifyContent: "flex-end",
	},

	listContainer: {
		flex: 1,
		width: "60%",
	},

	listItem: {
		flexDirection: "row",
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		justifyContent: "space-around",
		width: "100%",
	},
});

export default GameScreen;
