type TermData = {
  id: number;
}

export type SignUpUser = {
  request_data: {
    email: string;
    password: string;
    name: string;
    nickname: string;
    gender: string;
    contact: string;
    age: number;
  };
  term_data: TermData[];
}