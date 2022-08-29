export interface Fails {
  name: string[];
  email: string[];
  phone: string[];
  position_id: string[];
  photo: string[];
}

export interface CustomError {
  data: {
    success: boolean;
    message: string;
    fails: Fails;
  },
  status: number
}

