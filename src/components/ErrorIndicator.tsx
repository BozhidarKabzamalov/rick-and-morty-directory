import { StyleSheet, Text, View } from "react-native";

type ErrorIndicatorProps = {
	error: Error;
};

const ErrorIndicator = ({ error }: ErrorIndicatorProps) => {
	return (
		<View style={styles.centered}>
			<Text style={styles.errorTitle}>Something went wrong</Text>
			<Text style={styles.message}>
				{error ? error.message : "Failed to load."}
			</Text>
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
		marginTop: 8,
		fontSize: 14,
		color: "#6b7280",
		textAlign: "center",
	},
	errorTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
	},
});

export default ErrorIndicator;
