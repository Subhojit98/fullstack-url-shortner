import publicPaths from "@/constants/publicPaths";

const isPublicPath = (path: string) => {
	return publicPaths.includes(path.split("?")[0].replace(/\/$/, ""));
};

export default isPublicPath;
