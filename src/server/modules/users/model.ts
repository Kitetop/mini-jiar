import { isEmpty } from 'core';
import { XUserInfoAttr } from 'types';
import { AbstractCrud, IAbstractModel } from '../crud';

export const users: XUserInfoAttr[] = [
  { username: 'Kitetop', password: '1', id: '10000' },
  { username: 'Null', password: '2', id: '10001' }
];

class UserModle extends AbstractCrud<IAbstractModel<XUserInfoAttr>> {
  protected static instance: UserModle;

  protected constructor(model: XUserInfoAttr[], primary?: string) {
    super(model, primary);
  }

  public static getInstance(model: XUserInfoAttr[], primary?: string) {
    if (!this.instance) {
      this.instance = new UserModle(model, primary);
    }
    return this.instance;
  }

  /**
   * 获得用户token
   * @param username
   * @param password
   * @returns
   */
  public getToken(username: string, password: string) {
    const user = this.searchUser(username, password);
    if (user) {
      return `${username}_${password}`;
    }
    return null;
  }

  /**
   * 根据用户名和密码查找指定信息
   * @param username
   * @param password
   */
  public searchUser(username: string, password: string) {
    const user = this.find({ username, password });
    if (!isEmpty(users)) return user[0];
    return null;
  }
}

export const userModle = UserModle.getInstance(users);
