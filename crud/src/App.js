import './App.css';
// React-Router
import { Route } from 'react-router-dom';
// Component
import Header from './components/Header';
// Pages
import Main from './pages/Main';
import Regist from './pages/Regist';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <h1>CRUD</h1>
        <Route path='/' exact component={Main} />
        <Route path='/regist' component={Regist} />
        <Route path='/login' component={Login} />
      </main>
    </>
  );
}

export default App;
