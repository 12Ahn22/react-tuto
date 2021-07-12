import logo from './logo.svg';
import './App.css';
import Event from './components/Event';
import ClassValidation from './components/ClassValidation.jsx';
import Ref from './components/Ref';
import ScrollRef from './components/ScrollRef';
import Iteration from './components/Iteration';

function App() {
  return (
    <div className='App'>
      <Event />
      <ClassValidation />
      <Ref />
      <Iteration />
    </div>
  );
}

export default App;
