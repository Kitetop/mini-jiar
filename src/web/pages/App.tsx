import { useState } from 'react';
import { ProjectList } from './ProjectList';

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
    </>
  );
};
export default App;
