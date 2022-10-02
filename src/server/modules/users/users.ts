import { rest } from 'msw';
import { XUserInfoAttr } from 'types';

export function login() {
  return rest.post('login', async (req, res, ctx) => {
    const user = await req.json<Pick<XUserInfoAttr, 'username' | 'password'>>();
  });
}
