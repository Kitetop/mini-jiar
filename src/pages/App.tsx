// import { ProjectList } from './projects';
import { HFlexTapeLayout, HTapeLayout } from 'components';
import { Login } from './login';

const App = (): JSX.Element => {
  return (
    <>
      <HTapeLayout style={{ backgroundColor: 'grey' }} height={200} itemsSize={['auto']}>
        <div style={{ backgroundColor: 'red' }}>hhhh1</div>
        {/* <div style={{ backgroundColor: 'blue', width: 200 }}>hhhh2</div> */}
        {/* <div style={{ backgroundColor: 'yellow' }}>hhhh3</div> */}
      </HTapeLayout>
      <HTapeLayout
        style={{ backgroundColor: 'black' }}
        itemsSize={[300, '400', 'auto']}
        height={200}
      >
        <div style={{ backgroundColor: 'red' }}>hhhh1</div>
        <div style={{ backgroundColor: 'blue', width: 200 }}>hhhh2</div>
        <div style={{ backgroundColor: 'yellow' }}>hhhh3</div>
      </HTapeLayout>
      {/* <ProjectList /> */}
      <Login />
    </>
  );
};
export default App;
