export type User = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
};

export type Session = {
  userId: string;
  email: string;
  fullname: string;
};
