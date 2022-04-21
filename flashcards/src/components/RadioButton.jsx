import { getNewId } from '../services/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  checked = false,
  onChange = null,
  children: radioButtonDescription = 'Descrição do Botão',
}) {
  function handleRadioButtonChange() {
    if (onChange) {
      onChange();
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
      />
      <label htmlFor={id}>{radioButtonDescription}</label>
    </div>
  );
}
