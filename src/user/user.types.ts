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
