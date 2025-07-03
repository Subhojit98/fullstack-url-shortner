export const generateTokenExpiry = () => {
	return new Date(Date.now() + 60 * 60 * 1000);
};
