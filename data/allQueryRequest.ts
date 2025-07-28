import axios from "@/lib/axiosInstance";
const signUpUser = async (signUpData: FormData) => {
	try {
		const res = await axios.post(`/api/users/signup`, signUpData);

		return res.data;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const loginUser = async (loginData: { email: string; password: string }) => {
	try {
		const res = await axios.post(`/api/users/login`, loginData);
		return res.data;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const logoutUser = async () => {
	try {
		const res = (await axios.post("/api/users/logout")).data;
		return res;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};
const sendRestPasswordLink = async (email: string) => {
	try {
		const res = await axios.post(`/api/users/forgot-password-link`, {
			email,
		});
		return res.data;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const resetPassword = async (data: { token: string; newPassword: string }) => {
	try {
		const res = await axios.post(`/api/users/forgot-password`, data);
		return res.data;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const verifyEmail = async (token: string) => {
	try {
		const res = await axios.post(`/api/users/verify-email`, { token });
		return res.data;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const getUserDetails = async () => {
	try {
		const res = (await axios.get(`/api/users/me`)).data;

		return res;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const createCustomLink = async (linkData: {}) => {
	try {
		const res = (await axios.post("/api/links/create-link", linkData)).data;
		return res;
	} catch (error: any) {
		throw new Error(error.message || error);
	}
};

const getUserLocationInfo = async (ip: string) => {
	try {
		const res = (await axios.get(`${process.env.IPAPI_DOMAIN}/${ip}/json`))
			.data;
		return res;
	} catch (error: any) {
		console.error("ipapi error:", error);
		throw new Error(error.message || error);
	}
};

const getLinkDetails = async (linkId: string) => {
	try {
		const res = (await axios.get(`/api/links/link-analytics/${linkId}`)).data;
		return res;
	} catch (error: any) {
		console.error("GeoIP error:", error);
		throw new Error(error.message || error);
	}
};

export {
	signUpUser,
	loginUser,
	logoutUser,
	sendRestPasswordLink,
	resetPassword,
	verifyEmail,
	getUserDetails,
	getUserLocationInfo,
	createCustomLink,
	getLinkDetails,
};
