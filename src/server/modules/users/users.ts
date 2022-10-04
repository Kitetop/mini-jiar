import { isEmpty } from 'core';
import { rest } from 'msw';
import { XUserInfoAttr } from 'types';
import { userModle } from './model';

export function login() {
  return rest.post('login', async (req, res, ctx) => {
    const { username, password } = await req.json<Pick<XUserInfoAttr, 'username' | 'password'>>();
    const token = userModle.getToken(username, password);

    if (isEmpty(token)) {
      return res(
        ctx.status(404),
        ctx.json({
          message: '用户名密码错误'
        })
      );
    }

    return res(ctx.status(200), ctx.json({ token }));
  });
}
