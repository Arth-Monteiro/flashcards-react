export default function Button({
  children: description = 'Descrição do Botão',
  onClick = null,
}) {
  function handleButtonClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <button
      className="bg-gray-200 p-2 m-1 rounded-md"
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
