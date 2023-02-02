export interface XProjectAttr {
  id: string;
  projectName: string;
  belongPerson: string;
  createdTime: string;
}

export interface XUserInfoAttr {
  username: string;
  password: string;
  id: string;
  token?: string;
}

export interface XBaseResponseWithMsg {
  message: string;
}
