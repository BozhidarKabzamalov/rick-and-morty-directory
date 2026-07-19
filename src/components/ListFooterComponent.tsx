import { StyleSheet, Text, View } from "react-native";

type ListFooterComponentProps = {
	title: string;
};

const ListFooterComponent = ({ title }: ListFooterComponentProps) => {
	return (
		<View style={styles.footer}>
			<Text style={styles.message}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		alignItems: "center",
		paddingVertical: 16,
		gap: 8,
	},
	message: {
		fontSize: 14,
		color: "#6b7280",
		textAlign: "center",
	},
});

export default ListFooterComponent;
