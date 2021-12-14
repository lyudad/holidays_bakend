export interface IreturnUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_blocked: boolean;
  created_at: Date;
  token: string;
}

export interface IloginData {
  token: string;
  id: number;
  first_name: string;
  role: string;
  is_blocked: boolean;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  is_blocked: boolean;
}

export interface IUserMail {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface IreturnUserList {
  id: number;
  first_name: string;
  last_name: string;
  is_blocked: boolean;
}
