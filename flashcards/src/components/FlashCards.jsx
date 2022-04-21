export default function FlashCards({ children: flashcard }) {
  return (
    <div className="border p-2 flex flex-row items-center justify-ceter flex-wrap">
      {flashcard}
    </div>
  );
}
