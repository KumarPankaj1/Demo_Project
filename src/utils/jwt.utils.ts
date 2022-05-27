import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';

// declare const config: NodeJS.ConfigVars;
// declare const createError: ErrorConstructor;


class TokenUtil {
	/**
	 * @description A function to generate auth token while logging in.
	 * @param payload A payload data which will be stored in jwt.
	 * @param userType A user type for which token will be generated (secrets are different for different type of users)
	 * @param expiresIn A time in which jwt will be expired
	 */
      generateAuthToken(payload: { [key: string]: any },expiresIn?: number | string) {
		const key: any = process.env.SECRET_KEY;
		const options: SignOptions = {};
		if (expiresIn) {
			options.expiresIn = expiresIn;
		}
		return sign(payload, key, options);
	}


	verifyToken(token: string){
		const tokenData:any = verify(token, <string>process.env.SECRET_KEY);
		return tokenData
	}
}

export const tokenUtil = new TokenUtil();