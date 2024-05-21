export type AuthModel = {
  email: string;
  username?: string;
  password: string;
};

export type UserModel = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}