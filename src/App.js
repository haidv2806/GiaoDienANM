import './App.css';
import RegisterForm from './Input/RegisterForm';
import LoginForm from './Input/LoginForm';
import TokenForm from './Input/TokenForm';
import React,{ useState } from 'react';

// PORT=4000 npm start
function App() {
  const [name, setName] = useState("chưa xác định")
  const [email, setEmail] = useState("chưa xác định")
  const [message, setMessage] = useState("Không có thông báo")
  return (
    <div className="App">
      <header className="App-header">
        <RegisterForm />
        <LoginForm 
          setName={setName}
          setEmail={setEmail}
          setMessage={setMessage}
        />
        <TokenForm 
          name={name}
          email={email}
          message={message}
          setName={setName}
          setEmail={setEmail}
          setMessage={setMessage}
        />
      </header>
    </div>
  );
}

export default App;