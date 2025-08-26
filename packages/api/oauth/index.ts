import axios from 'axios'
import '@/util/request/interceptor'
import { oauthTokenParams } from '@/api/oauth/types'
import { OauthModel, LoginModel } from '@/util/store/oauth/types'
import { HttpResultModel } from '@/util/request/types'
import crypto from '@/util/crypto'
import { isProdEnv } from '@/util/common'

const primaryName = 'oauth'

export default {
  getToken: async (
		tenantId: number,
		username: string,
		password: string,
		captcha: string,
		phoneCaptcha?: string,
		loginType?: string
	): Promise<OauthModel> => {
		password = crypto.aesEncrypt(password);
		return (
			await axios.get<HttpResultModel<OauthModel>>('oauth/oauth/token', {
				params: {
					tenantId,
					username,
					password,
					client_id: 'c-smart',
					client_secret: 123456,
					grant_type: 'password',
					scope: 'login',
					loginType,
					phoneCaptcha,
					captcha,
				},
				timeout: 60 * 1000,
			})
		).data.data;
	},
  
	getTokenByFeishu: async (tenantId: number, code: string): Promise<OauthModel> => {
		return (
			await axios.get<HttpResultModel<OauthModel>>('oauth/oauth/token', {
				params: {
					tenantId,
					client_id: 'admin',
					client_secret: 123456,
					grant_type: 'token',
					scope: 'login',
					loginType: 'qrcode',
					code
				},
				timeout: 60 * 1000,
			})
		).data.data;
	},
	sendCodeOfModify: async (data: any) => {
		return (
			await axios.post<HttpResultModel<any>>(`${isProdEnv() ? 'base' : 'base-new'}/user/captcha/changePassword`, JSON.stringify(data),
				{
					headers: { 'Content-Type': 'application/json;charset=UTF-8' },
				})
		).data.data;
	},
	// 修改密碼
	modifyPassword: async (data: any) => {
		return (
			await axios.post<HttpResultModel<boolean>>(`${isProdEnv() ? 'base' : 'base-new'}/user/changePasswordByCaptcha`, JSON.stringify(data), {
				headers: { 'Content-Type': 'application/json;charset=UTF-8' },
			})
		).data.data;
	},
}
