import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSubmitting }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
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
          id="card-name-input"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error card-name-input-error" />
        <input
          value={link || ""}
          onChange={handleChangeLink}
          className="popup__input"
          name="link"
          id="card-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error card-link-input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
