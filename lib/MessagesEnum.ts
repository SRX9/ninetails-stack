export enum EmailVerifyMessages {
  INVALID_EMAIL_FORMAT = "Invalid Email!",
  UNREACHABLE_EMAIL_FORMAT = "Unreachable Email!",
  EMAIL_ALREADY_EXIST = "Email already exist!",
}

export enum TechnicalErrorMessages {
  GENERAL_ERROR = "Something went wrong! Please try again after some time.",
  AUTH_SESSION_NOT_FOUND_ERROR = "Authorization Error!",
  NOT_REQUIRED_PARAMS = "Required Parameters not found!",
}

export enum IErrorMessages {
  OVERLOADED_MESSAGE = "We are overloaded, and we are on it. Apologies for the inconvenience",
  TECHNICAL_ERROR = "Something went wrong! We are on it.",
}

export enum APIMessage {
  LOGIN_tO_CONTINUE_USE = "Please Login to Continue Using.",
  DONE_DANA_DONE = "Done",
}

export enum AuthMessage {
  EMPTY_EMAIL_CODE = "Verification Code required!",
  INVALID_VERIFICATION_CODE = "Invalid Verification Code!",
  VALID_VERIFICATION_CODE = "Valid Verification Code!",
  INVALID_CREATE_ACCOUNT_FORMAT = "Cannot create account based on information provided!",
  INVALID_PASSWORD_LOGIN = "Sorry, Password is invalid!",
  INVALID_LOGIN = "INVALID_LOGIN",
}

export enum GeneralMessage {
  SUCCESSFUL_PROCESS = "200 Status Process Successfully Completed.",
}

export enum PaymentMessage {
  EXPIRED_PROCESS = "Oops! Looks like your Payment Request Got Expired. Please Try again.",
  FAILED_PROCESS = "Oops! A little hiccup occurred. But no worries! If any amount was taken from your account, it'll either be refunded or your payment will go through smoothly within the next 24 hours. Thanks for your patience!",
  SUCCESS_FAILED_PROCESS = "Oops! Payment Request Failed for some reason. Please try again at",
}
