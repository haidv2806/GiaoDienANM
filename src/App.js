import './App.css';
import RegisterForm from './Input/RegisterForm';
import LoginForm from './Input/LoginForm';
import TokenForm from './Input/TokenForm';
// PORT=4000 npm start
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RegisterForm />
        <LoginForm />
        <TokenForm />
      </header>
    </div>
  );
}

export default App;