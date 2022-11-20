import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          {currentUser.avatar && (
            <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар" />
          )}
          <button
            onClick={onEditAvatar}
            className="profile__edit-avatar"
            type="button"
            aria-label="Редактировать аватар"
          />
        </div>

        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>

        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото"
        />
      </section>

      <section className="cards">
        <ul className="cards__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
