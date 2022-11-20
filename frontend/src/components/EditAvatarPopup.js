import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSubmitting }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonTextOnSubmit="Сохранение"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <fieldset className="popup__fieldset">
        <input
          ref={avatarRef}
          className="popup__input"
          name="avatar"
          id="avatar-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error avatar-link-input-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
