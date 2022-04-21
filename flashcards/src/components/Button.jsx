export default function Button({
  children: description = 'Descrição do Botão',
  onClick = null,
  colorClass = 'bg-gray-200',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <button
      className={`${colorClass} p-2 m-1 rounded-md`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
