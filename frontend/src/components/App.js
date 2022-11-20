import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cardToDelete, setCardToDelete] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken({ token })
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsSubmitting(true);
    api
      .deleteCard({ cardId: card._id })
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardDeleteClick(card) {
    setIsDeletePlacePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardToDelete({ name: "", link: "" });
    setIsSubmitting(false);
  }

  function handleUpdateUser(user) {
    setIsSubmitting(true);
    api
      .patchUserInfo(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsSubmitting(true);
    api
      .patchUserAvatar({ avatar })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    setIsSubmitting(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSignUp({ email, password }) {
    setIsSubmitting(true);
    auth
      .register({ email, password })
      .then((data) => {
        setIsAuthSuccess(true);
        setIsInfoTooltipPopupOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);

        setIsAuthSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignIn({ email, password }) {
    setIsSubmitting(true);
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleSignOut} />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
        />

        <Route path="/sign-in">
          <Login
            onLogin={handleSignIn}
            isSubmitting={isSubmitting}
            buttonTextOnSubmit="Авторизация..."
            buttonText="Войти"
          />
        </Route>

        <Route path="/sign-up">
          <Register
            onRegister={handleSignUp}
            isSubmitting={isSubmitting}
            buttonTextOnSubmit="Регистрация..."
            buttonText="Зарегистрироваться"
          />
        </Route>

        <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
      </Switch>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isSubmitting={isSubmitting}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isSubmitting={isSubmitting}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isSubmitting={isSubmitting}
      />

      <DeletePlacePopup
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        card={cardToDelete}
        isSubmitting={isSubmitting}
      />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        isAuthSuccess={isAuthSuccess}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
