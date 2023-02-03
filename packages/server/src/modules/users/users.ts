import { isEmpty } from '@kite/utils';
import { rest } from 'msw';
import { getUserModle } from './model';

import type { XUserInfoAttr } from '../index.type';

/**
 * 用户登陆接口
 * @returns
 */
export function login() {
  return rest.post('login', async (req, res, ctx) => {
    const { username, password } = await req.json<Pick<XUserInfoAttr, 'username' | 'password'>>();
    const token = getUserModle().getToken(username, password);

    if (isEmpty(token)) {
      return res(
        ctx.status(404),
        ctx.json({
          message: '用户名密码错误'
        })
      );
    }

    return res(ctx.status(200), ctx.json({ token, username }));
  });
}

/**
 * 用户注册接口
 * @returns
 */
export function register() {
  return rest.post('register', async (req, res, ctx) => {
    const { username, password } = await req.json<Pick<XUserInfoAttr, 'username' | 'password'>>();
    const userModle = getUserModle();
    const user = userModle.searchUser({ username, password });
    if (isEmpty(user)) {
      userModle.save({ username, password, id: userModle.generateId() });
      return res(ctx.status(200), ctx.json({ message: '注册成功' }));
    }
    return res(
      ctx.status(400),
      ctx.json({
        message: '该用户已经存在，请直接登录'
      })
    );
  });
}

/**
 * 查找用户列表接口
 * @returns
 */
export function getUserList() {
  return rest.get('user/list', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getUserModle().findAll()));
  });
}
