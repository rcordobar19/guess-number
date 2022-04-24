import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = ({ title }: { title: string }) => {
	return (
		<View style={styles.header}>
			<TitleText>{title}</TitleText>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Header;
