import queryClient from "@/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppProviders({ children }: PropsWithChildren) {
	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
