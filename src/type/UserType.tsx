export type userEmailCheck = {
  email: string;
}

export type userEmailCodeCheck = {
  email: string;
  code: string | number | undefined;
}

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

export type LoginUser = {
  email: string;
  password: string;
}

export type AddressInsertType = {
  name: string,
  address: string,
  detail_address: string,
  zip_code: string

}

export type UserAddress = {
  address: string,
  created_at: string,
  detail_address: string,
  id: number
  is_main: boolean,
  name: string,
  updated_at: string,
  zip_code: string,
}

export type updateAddressType = {
  is_main: boolean;
  id: number;
}
