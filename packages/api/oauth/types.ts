/* eslint-disable camelcase */
import { InjectionKey, Ref } from 'vue';

export interface OauthModel {
	access_token: string;
	refresh_token: string;
	scope: string;
	token_type: string;
}

// oauth 获取token 参数
export interface oauthTokenParams {
	tenantId?: number;
	username?: string;
	password?: string;
	code?: string;
	thirdId?: string;
}
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
