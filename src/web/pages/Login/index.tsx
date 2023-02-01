import { FormEvent } from 'react';

import { useAuth } from 'hooks/auth';

export const Login = () => {
  const authContext = useAuth();

  /**
   * 提交事件
   * @param event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    authContext.login({ username, password });
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
