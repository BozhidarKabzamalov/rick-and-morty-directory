import { StyleSheet, Text, View } from "react-native";

type DetailRowProps = {
	label: string;
	value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
	return (
		<View style={styles.row}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		gap: 4,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6b7280",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	value: {
		fontSize: 18,
	},
});

export default DetailRow;
