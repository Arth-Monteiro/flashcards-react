import { getNewId } from '../services/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  checked = false,
  onClick = null,
  onChange = null,
  children: radioButtonDescription = 'Descrição do Botão',
}) {
  function handleRadioButtonChange() {
    if (onChange) {
      onChange();
    }
  }

  function handleRadioButtonClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={handleRadioButtonChange}
        onClick={handleRadioButtonClick}
      />
      <label htmlFor={id}>{radioButtonDescription}</label>
    </div>
  );
}
