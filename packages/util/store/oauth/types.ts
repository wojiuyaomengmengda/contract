export interface OauthModel {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
};

export interface LoginModel {
	loginType: string;
	tenantId: number;
	account: string;
	password: string;
	captcha: string;
	phoneCountryCode?: string;
	phone?: string;
	phoneCaptcha?: string;
}