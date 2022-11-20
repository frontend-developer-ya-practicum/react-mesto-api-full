import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onClose, onCardDelete, card, isSubmitting }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      buttonTextOnSubmit="Удаление"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}

export default DeletePlacePopup;
