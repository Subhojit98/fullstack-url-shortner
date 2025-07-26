export type CreatedLink = {
	_id: string;
	shortId: string;
	originalUrl: string;
	title: string;
	totalClicks: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type UserData = {
	_id: string;
	username: string;
	email: string;
	avatar: string | null;
	isVerified: boolean;
	createdLinks: CreatedLink[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	refreshToken: string;
};
