// axiosInterceptors.ts
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use the API base URL here
	withCredentials: true, // send cookies
});

// Flag to prevent infinite refresh loops
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	// Attach interceptor to axiosInstance
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// prevent infinite loop
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
						return axiosInstance(originalRequest); // Use axiosInstance here
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// Ensure this matches your refresh token endpoint
				const res = await axiosInstance.post("/api/users/refresh-token");
				isRefreshing = false;

				processQueue(null, res.data?.accessToken || null);

				// Since token is in cookie, no need to set Authorization header
				return axiosInstance(originalRequest); // Use axiosInstance here
			} catch (err) {
				isRefreshing = false;
				processQueue(err, null);
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance; // Export the configured instance
