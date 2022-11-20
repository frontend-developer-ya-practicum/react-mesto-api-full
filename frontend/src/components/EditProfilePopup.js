import { useState, useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSubmitting }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonTextOnSubmit="Сохранение"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <fieldset className="popup__fieldset">
        <input
          value={name || ""}
          onChange={handleChangeName}
          className="popup__input"
          name="name"
          id="profile-name-input"
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error profile-name-input-error" />
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          className="popup__input"
          name="about"
          id="profile-about-input"
          type="text"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error profile-about-input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
