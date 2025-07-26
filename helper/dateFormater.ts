export function formatDate(isoDate: string): string {
	const date = new Date(isoDate);

	if (!date) {
		return "N/A";
	}
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
