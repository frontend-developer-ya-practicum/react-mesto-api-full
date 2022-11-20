import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister, isSubmitting, buttonTextOnSubmit, buttonText }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(credentials);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          value={credentials.email}
          onChange={handleChange}
          className="register__input"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          className="register__input"
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"
          required
        />
        <button className="register__button" type="submit">
          {isSubmitting ? buttonTextOnSubmit : buttonText}
        </button>
      </form>
      <div className="register__sign-in">
        <p className="register__sign-in-title">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__sign-in-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
