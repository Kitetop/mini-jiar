import { FormEvent } from 'react';
import type { XUserInfoAttr } from 'types';

function login(params: Omit<XUserInfoAttr, 'id'>) {
  return fetch('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
}

export const Login = () => {
  /**
   * 提交事件
   * @param event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password }).then(async res => {
      if (res.ok) {
        // console.log(await res.json());
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username"></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password"></input>
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
