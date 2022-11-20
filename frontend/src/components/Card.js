import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : ""
  }`;

  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        onClick={handleCardDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить картинку"
      />
      <img onClick={handleClick} className="card__image" src={card.link} alt={card.name} />
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
          />
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
