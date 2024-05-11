export const AUTH_USER_EXISTS = 'A user with this email already exists';
export const AUTH_USER_NOT_FOUND = 'User is not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_CHANGE_USER_CURRENT_PASSWORD_WRONG =
  'The current password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  CurrentPasswordError: 'Tha passed current password is not correct',
  Refresh: 'Get a new access/refresh tokens',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid',
  MinPasswordLength: 'Password must be at least 6 characters long',
  MaxPasswordLength: 'Password cannot be longer than 12 characters',
  MinLastNameLength: 'Last name must be at least 3 characters long',
  MaxLastNameLength: 'Last name cannot be longer than 50 characters',
  MinNameLength: 'First name must be at least 3 characters long',
  MaxNameLength: 'First name cannot be longer than 50 characters',
} as const;
