import { useContext, useEffect, useState } from 'react';
import { ProjectList } from './projects';
import { Login } from './login';
import { AuthContext } from 'context/auth-context';

const App = (): JSX.Element => {
  const context = useContext(AuthContext);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount(v => v + 1);
    }, 5000);

    return () => {
      clearInterval(t);
    };
  }, []);
  return (
    <>
      <div className="container">This is React App; {count} </div>
      {context ? <div className="container">用户名: {context.user?.username}</div> : undefined}
      <button
        onClick={() =>
          setCount(v => {
            return v + 1;
          })
        }
      >
        加一
      </button>
      <ProjectList />
      <Login />
    </>
  );
};
export default App;
