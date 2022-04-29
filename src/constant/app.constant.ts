export const ENVIRONMENT = {
    PRODUCTION: `production`,
    DEVELOPMENT: `development`,
    STAGING: `staging`,
    QA: `qa`,
    TESTING: `testing`,
    DEFAULT: `default`
}

export const DBENUMS = {
    //SIGNUPSOURCE: ['NORMAL', 'APPLE', 'GOOGLE', 'FACEBOOK'],
    GENDER: {
        'MALE':1,
        'FEMALE':2,
        'OTHER':3
    },
    STATUS: {
        ACTIVE:1,
        INACTIVE:2,
        DELETED:3
    },
    USERTYPE: {
        'USER':1,
        'CONTRACTOR':2,
        'OTHER':3
    },
    ADMIN: {
        'SUPER_ADMIN':1,
        'SUB_ADMIN':2,
    }
}

export let STATUS_MSG = {
    ERROR: {
        BAD_REQUEST: {
            statusCode: 400,
            success: false,
            message: 'BAD REQUEST',
            type: 'BAD_REQUEST'
        },

        PAGINATION: {
            statusCode: 400,
            success: false,
            message: 'Page value can not be less than zero',
            type: 'BAD_REQUEST'
        },
        HEADER_MISSING: {
            statusCode: 400,
            success: false,
            message: 'Token missing',
            type: 'BAD_REQUEST'
        },
        PASSWORD_NOT_MATCHED: {
            statusCode: 400,
            success: false,
            type: 'PASSWORD_NOT_MATCHED',
            message: 'Password does not match with confirm password'
        },

        INCORRECT_CREDENTIALS: {
            statusCode: 400,
            success: false,
            message: 'Incorrect credentials. Please try again',
            type: 'INCORRECT_CREDENTIALS'
        },
        BLOCKED_ACCOUNT: {
            statusCode: 403,
            success: false,
            name: 'INVALID_ACCOUNT',
            message: 'Your account has been temporarly blocked'
        },
        INVALID_CREDENTIALS: {
            statusCode: 400,
            success: false,
            type: 'INVALID_CREDENTIALS',
            message: 'The otp you entered is incorrect.'
        },
        INVALID_PHONENUMBER: {
            statusCode: 400,
            success: false,
            type: 'INVALID_CREDENTIALS',
            message: 'The phoneNumber you entered is incorrect.'
        },
        PAGE_NOT_FOUND: {
            statusCode: 400,
            success: false,
            type: 'PAGE_NOT_FOUND',
            message: 'Page not found!'
        },
        INCORECT_INFORMATION: {
            statusCode: 400,
            success: false,
            type: 'INVALID_INFORMATION',
            message: 'The information you entered is not valid.'
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode: 408,
            success: false,
            message: 'Your session has expired. Please logout and login again.',
            type: 'TOKEN_ALREADY_EXPIRED'
        },
        TOKEN_ALREADY_EXIST: {
            statusCode: 400,
            success: false,
            type: 'TOKEN_ALREADY_EXIST',
            message: 'Your session has already logged in'
        },
        DB_ERROR: {
            statusCode: 400,
            success: false,
            message: 'DB Error : ',
            type: 'DB_ERROR'
        },
        INVALID_TOKEN: {
            statusCode: 401,
            success: false,
            message: 'Invalid token provided',
            type: 'INVALID_TOKEN'
        },

        UNAUTHORIZED: {
            statusCode: 401,
            success: false,
            message: 'You are not authorized to perform this action',
            type: 'UNAUTHORIZED'
        },
        UNAUTHORIZED_ADMIN: {
            statusCode: 408,
            success: false,
            message: 'Session Expired',
            type: 'UNAUTHORIZED'
        },
        MISSINING_AUTHENTICATION: (tokenType: any) => {
            return {
                statusCode: 401,
                success: false,
                message: 'Missing authentication ' + tokenType,
                type: 'MISSINING_AUTHENTICATION'
            }
        },
        INVALID_API_KEY: () => {
            return {
                statusCode: 401,
                success: false,
                message: 'Inavlid Api Key',
                type: 'MISSINING_AUTHENTICATION'
            }
        },
        IMP_ERROR: {
            statusCode: 500,
            success: false,
            message: 'Implementation Error',
            type: 'IMP_ERROR'
        },
        NOT_EXIST: (title: string) => {
            return {
                statusCode: 400,
                success: false,
                message: `${title} does not exist!`,
                type: 'BAD_REQUEST'
            }
        },
        ALREADY_EXIST: (title: string) => {
            return {
                statusCode: 400,
                success: false,
                message: `${title}  exist!`,
                type: 'BAD_REQUEST'
            }
        },
        ALREADY_LOGGEDIN: (title: string) => {
            return {
                statusCode: 400,
                success: false,
                message: `${title}  already exist`,
                type: 'BAD_REQUEST'
            }
        },
        ACTION_NOT_ALLOWED: {
            statusCode: 406,
            success: false,
            message: 'Action not allowed.',
            type: 'ACTION_NOT_ALLOWED'
        },
        DEFAULT_ERROR_MESSAGE: (message: string) => {
            return {
                statusCode: 406,
                success: false,
                message: message,
                type: 'DEFAULT_ERROR_MESSAGE'
            }
        }
    },

    SUCCESS: {
        DEFAULT: {
            statusCode: 200,
            success: true,
            message: 'Success',
            name: 'DEFAULT'
        },
        PROFILE_UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Profile updated Successfully',
            type: 'CREATED'
        },
        UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Updated Successfully',
            name: 'UPDATED'
        },
        LOGOUT: {
            statusCode: 200,
            success: true,
            message: 'Logged Out Successfully',
            type: 'LOGOUT'
        },
        DELETED: {
            statusCode: 200,
            success: true,
            message: 'Deleted Successfully',
            type: 'DELETED'
        },
        EMPTY_RECORD: {
            statusCode: 200,
            success: true,
            message: 'No record found.',
            type: 'DEFAULT'
        },
        CREATED:(msg?: any) => {
            return {
            statusCode: 200,
            success: true,
            message: "created Successfully",
            type: 'CREATED',
            data: msg
            }
        },
        USER_CREATED:{
            statusCode: 200,
            success: true,
            message: "user created Successfully",
            type: 'CREATED',
        },
        UPDATE_SUCCESS: (title: string) => {
            return {
                statusCode: 200,
                success: true,
                message: `${title} successfully`,
                type: 'UPDATE_SUCCESS'
            }
        },
        USER_IMAGE_UPLOADED: {
                statusCode: 200,
                success: true,
                message: 'user image upload successfully',
                type: 'UPDATE_SUCCESS'
        },
        FETCH_SUCCESS: (msg:any) => {
            return {
                statusCode: 200,
                success: true,
                message: msg,
                type: 'FETCH_SUCCESS'
            }
        },
        OTP_GENERATE_SUCCESFULLY:  {
                statusCode: 200,
                success: true,
                message: "'Otp has been send on your phoneNumber Successfully'",
                type: 'OTP_GENERATE_SUCCESFULLY'
        },
        USER_LOGGED_IN_SUCCESFULLY: (msg:any)=>{
            return{
            statusCode: 200,
            success: true,
            message: "Login Successfully",
            type: 'LOGIN_SUCCESS',
            data: msg
        }
    }
        }
}