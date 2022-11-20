import { Link, Route } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo"></div>

      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <Link to="/sign-in" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
