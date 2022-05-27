export const ENVIRONMENT = {
  PRODUCTION: `production`,
  DEVELOPMENT: `development`,
  STAGING: `staging`,
  QA: `qa`,
  TESTING: `testing`,
  DEFAULT: `default`,
};

export const DBENUMS = {
  //SIGNUPSOURCE: ['NORMAL', 'APPLE', 'GOOGLE', 'FACEBOOK'],
  GENDER: {
    MALE: 1,
    FEMALE: 2,
    OTHER: 3,
  },
  STATUS: {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
  },
  USERTYPE: {
    USER: 1,
    CONTRACTOR: 2,
    OTHER: 3,
  },
  ADMIN: {
    SUPER_ADMIN: 1,
    SUB_ADMIN: 2,
  },
  EDUCATION: {
    GRADUATE: 1,
    POSTGRADUATE: 2,
    DIPLOMA: 3,
  },
  WORKEXPERINCE: {
    CONSTRUCTION_LABOR: 1,
    CALL_CENTER_OPERATOR: 2,
    FOOD_DELIVERY: 3,
    OTHER: 4,
  },
  JOBCATEGORY: {
    CONSTRUCTION_LABOR: 1,
    CALL_CENTER_OPERATOR: 2,
    FOOD_DELIVERY: 3,
    OTHER: 4,
  },
  WORKLOOKINGFOR: [
    "Construction-Labor",
    "Call-Center-Operator",
    "Food-Delivery",
    "Executive-BPO"
  ],
  LOCATION: {
    NOIDA: 1,
    CHANDIGARH: 2,
    LUCKNOW: 3,
    UTTARAKHAND: 4,
  },
};

export let STATUS_MSG = {
  ERROR: {
    BAD_REQUEST: {
      statusCode: 400,
      success: false,
      message: "BAD REQUEST",
      type: "BAD_REQUEST",
    },

    INCORRECT_SYNTAX:{
      statusCode: 400,
      success: false,
      message: "syntax of db query is not proper",
      type: "BAD_REQUEST",
    },

    PAGINATION: {
      statusCode: 400,
      success: false,
      message: "Page value can not be less than zero",
      type: "BAD_REQUEST",
    },
    HEADER_MISSING: {
      statusCode: 400,
      success: false,
      message: "Token missing",
      type: "BAD_REQUEST",
    },
    PASSWORD_NOT_MATCHED: {
      statusCode: 400,
      success: false,
      type: "PASSWORD_NOT_MATCHED",
      message: "Password does not match with confirm password",
    },

    INCORRECT_CREDENTIALS: {
      statusCode: 400,
      success: false,
      message: "Incorrect credentials. Please try again",
      type: "INCORRECT_CREDENTIALS",
    },
    BLOCKED_ACCOUNT: {
      statusCode: 403,
      success: false,
      name: "INVALID_ACCOUNT",
      message: "Your account has been temporarly blocked",
    },
    INVALID_CREDENTIALS: {
      statusCode: 400,
      success: false,
      type: "INVALID_CREDENTIALS",
      message: "The otp you entered is incorrect.",
    },
    INVALID_PHONENUMBER: {
      statusCode: 400,
      success: false,
      type: "INVALID_CREDENTIALS",
      message: "Either twilio service has reached its limit of day or phoneNumber you entered is incorrect.",
    },
    PAGE_NOT_FOUND: {
      statusCode: 400,
      success: false,
      type: "PAGE_NOT_FOUND",
      message: "Page not found!",
    },
    INCORECT_INFORMATION: {
      statusCode: 400,
      success: false,
      type: "INVALID_INFORMATION",
      message: "The information you entered is not valid.",
    },
    TOKEN_ALREADY_EXPIRED: {
      statusCode: 408,
      success: false,
      message: "Your session has expired. Please logout and login again.",
      type: "TOKEN_ALREADY_EXPIRED",
    },
    TOKEN_ALREADY_EXIST: {
      statusCode: 400,
      success: false,
      type: "TOKEN_ALREADY_EXIST",
      message: "Your session has already logged in",
    },
    DB_ERROR: {
      statusCode: 400,
      success: false,
      message: "DB Error",
      type: "DB_ERROR",
    },
    INVALID_TOKEN: {
      statusCode: 401,
      success: false,
      message: "Invalid token provided",
      type: "INVALID_TOKEN",
    },

    UNAUTHORIZED: {
      statusCode: 401,
      success: false,
      message: "You are not authorized to perform this action",
      type: "UNAUTHORIZED",
    },
    SESSION_EXPIRED: {
      statusCode: 408,
      success: false,
      message: "Session Expired",
      type: "UNAUTHORIZED",
    },
    MISSINING_AUTHENTICATION: (tokenType: any) => {
      return {
        statusCode: 401,
        success: false,
        message: "Missing authentication " + tokenType,
        type: "MISSINING_AUTHENTICATION",
      };
    },
    INVALID_API_KEY: () => {
      return {
        statusCode: 401,
        success: false,
        message: "Inavlid Api Key",
        type: "MISSINING_AUTHENTICATION",
      };
    },
    IMP_ERROR: {
      statusCode: 500,
      success: false,
      message: "Implementation Error",
      type: "IMP_ERROR",
    },
    NOT_EXIST: (title: string) => {
      return {
        statusCode: 400,
        success: false,
        message: `${title} does not exist!`,
        type: "BAD_REQUEST",
      };
    },
    ALREADY_EXIST: (title: string) => {
      return {
        statusCode: 400,
        success: false,
        message: `${title}  exist!`,
        type: "BAD_REQUEST",
      };
    },
    ALREADY_LOGGEDIN: (title: string) => {
      return {
        statusCode: 400,
        success: false,
        message: `${title}  already exist`,
        type: "BAD_REQUEST",
      };
    },
    ACTION_NOT_ALLOWED: {
      statusCode: 406,
      success: false,
      message: "Action not allowed.",
      type: "ACTION_NOT_ALLOWED",
    },
    DEFAULT_ERROR_MESSAGE: (message: string) => {
      return {
        statusCode: 406,
        success: false,
        message: message,
        type: "DEFAULT_ERROR_MESSAGE",
      };
    },
  },

  SUCCESS: {
    DEFAULT: {
      statusCode: 200,
      success: true,
      message: "Success",
      name: "DEFAULT",
    },
    PROFILE_UPDATED: {
      statusCode: 200,
      success: true,
      message: "Profile updated Successfully",
      type: "CREATED",
    },
    UPDATED: {
      statusCode: 200,
      success: true,
      message: "Updated Successfully",
      name: "UPDATED",
    },
    LOGOUT: {
      statusCode: 200,
      success: true,
      message: "Logged Out Successfully",
      type: "LOGOUT",
    },
    DELETED: {
      statusCode: 200,
      success: true,
      message: "Deleted Successfully",
      type: "DELETED",
    },
    EMPTY_RECORD: {
      statusCode: 200,
      success: true,
      message: "No record found.",
      type: "DEFAULT",
    },
    CREATED: (msg?: any) => {
      return {
        statusCode: 201,
        success: true,
        data:msg,
        message: "created Successfully",
        type: "CREATED",
      };
    },
    USER_CREATED: {
      statusCode: 200,
      success: true,
      message: "user profile created Successfully",
      type: "CREATED",
    },
    ADMIN_CREATED: {
      statusCode: 200,
      success: true,
      message: "admin created Successfully",
      type: "CREATED",
    },
    UPDATE_SUCCESS: (msg:any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "updated successfully",
        type: "UPDATE_SUCCESS",
      };
    },
    LOGOUT_SUCCESS: (msg:any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "logout successfully",
        type: "LOGOUT_SUCCESS",
      };
    },
    DELETE_SUCCESS: (msg:any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "deleted successfully",
        type: "DELETED_SUCCESS",
      };
    },
    USER_IMAGE_UPLOADED: {
      statusCode: 200,
      success: true,
      message: "user image upload successfully",
      type: "UPDATE_SUCCESS",
    },
    ADMIN_IMAGE_UPLOADED: {
      statusCode: 200,
      success: true,
      message: "admin image upload successfully",
      type: "UPDATE_SUCCESS",
    },
    USER_VIDEO_UPLOADED: {
        statusCode: 200,
        success: true,
        message: "user video upload successfully",
        type: "UPDATE_SUCCESS",
      },
    FETCH_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "All jobs has been fetched successfully",
        type: "FETCH_SUCCESS",
      };
    },
    COUNT_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "All answers count has been done successfully",
        type: "COUNT_SUCCESS",
      };
    },
    SUBMIT_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "your answer has been submitted successfully",
        type: "SUBMIT_SUCCESS",
      };
    },
    FEEDBACK_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "feedback has been submited successfully",
        type: "FEEDBACK_SUCCESS",
      };
    },
    APPLIED_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "you have applied at the job successfully",
        type: "APPLIED_SUCCESS",
      };
    },
    FILTER_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "All jobs has been filtered according to your filter successfully",
        type: "FETCH_SUCCESS",
      };
    },
    GET_SUCCESS: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "user personal details and his education and previous work experience fetch successfully",
        type: "GET_SUCCESS",
      };
    },
    OTP_GENERATE_SUCCESFULLY: {
      statusCode: 200,
      success: true,
      message: "'Otp has been send on your phoneNumber Successfully'",
      type: "OTP_GENERATE_SUCCESFULLY",
    },
    USER_LOGGED_IN: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "Login Successfully",
        type: "LOGIN_SUCCESS"
      };
    },
    QUESTION_UPLOADED: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "Question Upload Successfully",
        type: "UPLOAD_SUCCESS"
      };
    },
    ADMIN_LOGGED_IN_SUCCESFULLY: (msg: any) => {
      return {
        statusCode: 200,
        success: true,
        data:msg,
        message: "Login Successfully",
        type: "LOGIN_SUCCESS",
      };
    },
    USER_WORKEXPERIENCEDEATILS_CREATED:  {
        statusCode: 200,
        success: true,
        message: "work experience details created Successfully",
        type: "SUCCESS",
    },
    JOB_CREATED:(msg:any)=>{
      return{
      statusCode: 202,
        success: true,
        data:msg,
        message: "Job created Successfully",
        type: "SUCCESS"
    }}
  },
};
