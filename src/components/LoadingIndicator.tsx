import { StyleSheet, Text, View } from "react-native";

type LoadingIndicatorProps = {
	title?: string;
};

const LoadingIndicator = ({ title = "Loading" }: LoadingIndicatorProps) => {
	return (
		<View style={styles.centered}>
			<Text style={styles.message}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	message: {
		fontSize: 14,
		color: "#6b7280",
		textAlign: "center",
	},
});

export default LoadingIndicator;
