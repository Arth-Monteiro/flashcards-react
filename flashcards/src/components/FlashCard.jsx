export default function FlashCard({
  id = null,
  title = 'Título do Card',
  description = 'Descrição do Card',
  showTitle = true,
  onClick = null,
}) {
  function toggleCardClick() {
    if (onClick) {
      onClick(id);
    }
  }

  const fontSizeClassName = showTitle ? 'text-xl' : 'text-sm';

  return (
    <div
      className={`shadow-lg p-4 m-2 w-80 h-48  
                  cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'Courier New', monospace" }}
      onClick={toggleCardClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
