type NullableString = string | null;

export type UserRole = {
  id: string;
};

export type UserRegistration = {
  firstName: NullableString;
  lastName: NullableString;
  phoneNumber: NullableString;
  email: NullableString;
  password: NullableString;
  confirmPassword: NullableString;
  roles?: UserRole[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export interface UserApiResponse {
  message: string;
}
