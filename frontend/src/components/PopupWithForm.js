import { useCallback, useEffect } from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  buttonTextOnSubmit,
  onSubmit,
  isSubmitting,
}) {
  const handleEscClose = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  function handleClickOnOutside(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleClickOnOutside}
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        />
        <form onSubmit={onSubmit} className="popup__form" name={`${name}-form`} noValidate>
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button className="popup__submit" type="submit">
            {isSubmitting ? buttonTextOnSubmit : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
