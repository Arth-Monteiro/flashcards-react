export default function FlashCards({ children: flashcard }) {
  return (
    <div className="border p-2 flex flex-row items-center justify-center flex-wrap">
      {flashcard}
    </div>
  );
}
