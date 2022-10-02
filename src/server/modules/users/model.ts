import { XUserInfoAttr } from 'types';
import { AbstractCrud } from '../crud';

export const users: XUserInfoAttr[] = [
  { username: 'Kitetop', password: '1', id: '10000' },
  { username: 'Null', password: '2', id: '10001' }
];

class UserModle extends AbstractCrud<XUserInfoAttr> {}

export const userModle = UserModle.getInstance(users);
