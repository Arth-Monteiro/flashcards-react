import { useState, useEffect } from 'react';
import Button from './Button';
import Error from './Error';

import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title ?? '');
  const [description, setDescription] = useState(flashCard?.description ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    if (validateForm()) {
      setError('');
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Title and Description required.');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const backGroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return (
    <form
      className={`${backGroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">FlashCard Maintenance</h2>

      <TextInput
        labelDescription="Title:"
        value={title}
        onChange={handleTitleChange}
      />
      <TextArea
        labelDescription="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span></span>}
        <div>
          <Button colorClass="bg-red-200" type="reset">
            Reset
          </Button>
          <Button colorClass="bg-green-300" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
