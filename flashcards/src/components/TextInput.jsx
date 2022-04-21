import { getNewId } from './../services/idService';

export default function TextInput({
  id = getNewId(),
  labelDescription = 'Descrição do label: ',
  value = 'Valor padrão do input',
  onChange = null,
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onChange) {
      const newValue = currentTarget.value;
      onChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        id={id}
        className="border p-1"
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={handleInputChange}
      />
    </div>
  );
}
