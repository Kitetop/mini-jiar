import { login, register, getUserList } from './users';

export const userHandlers = [login(), register(), getUserList()];
