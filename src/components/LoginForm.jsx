// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
     
      
      navigate("/profile")
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2 className="login-title">Вхід</h2>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" type="submit">Увійти</button>
    </form>
  );
};

export default LoginForm;
