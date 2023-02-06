import { login, register, getUserList, getUserInfoByToken } from './users';

export const userHandlers = [login(), register(), getUserList(), getUserInfoByToken()];
