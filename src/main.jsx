import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Імпортуємо BrowserRouter
import App from "./App"; // Ваш основний компонент
import "./App.css"; // Підключаємо стилі

// Створюємо корінь для додатку
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Обгортаємо додаток в <BrowserRouter>
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
