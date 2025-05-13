
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Реєстрація успішна!');
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2 className="register-title">Реєстрація</h2>
      <input
        className="register-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" type="submit">Зареєструватися</button>
    </form>
  );
};

export default RegistrationForm;
