import { useState } from 'react';
import { ProjectList } from './ProjectList';
import { Login } from './Login';

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="container">This is React App; {count}</div>
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
