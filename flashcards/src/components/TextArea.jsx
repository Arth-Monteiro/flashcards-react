import { getNewId } from './../services/idService';

export default function TextArea({
  id = getNewId(),
  labelDescription = 'Descrição do label: ',
  value = 'Valor padrão da textarea',
  onChange = null,
  maxLength = 230,
  rows = 4,
}) {
  function handleValueChange({ currentTarget }) {
    if (onChange) {
      const newValue = currentTarget.value;
      onChange(newValue);
    }
  }

  const currentCharCount = value.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        id={id}
        className="border p-1"
        value={value}
        maxLength={maxLength}
        rows={rows}
        onChange={handleValueChange}
      />
      <div className="text-right mr-1 mt-1">
        <span>
          {currentCharCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
