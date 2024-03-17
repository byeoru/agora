export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_REGEX_ERROR =
  "A password must have lowercase, uppercase, a number and special charactors.";
