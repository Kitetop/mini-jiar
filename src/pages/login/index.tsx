import { useRef } from 'react';
import { useAuth } from 'hooks/custom-context';

export const Login = () => {
  const authContext = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null),
    passwordRef = useRef<HTMLInputElement>(null);

  /**
   * 提交事件
   * @param event
   */
  const handleLogin = () => {
    authContext.login({
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || ''
    });
  };

  const handleRegister = () => {
    authContext.register({
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || ''
    });
  };

  return (
    <>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" ref={usernameRef}></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" ref={passwordRef}></input>
      </div>
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleRegister}>注册</button>
    </>
  );
};
