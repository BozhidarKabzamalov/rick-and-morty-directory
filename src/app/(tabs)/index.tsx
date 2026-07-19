import Characters from "@/components/Characters";
import { StyleSheet, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Characters />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
