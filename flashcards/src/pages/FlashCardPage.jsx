import FlashCards from './../components/FlashCards';
import FlashCard from './../components/FlashCard';
import RadioButton from './../components/RadioButton';
import Button from './../components/Button';
import Header from './../components/Header';
import Main from './../components/Main';
import { allFlashCards } from '../data/allFlashCards';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import { useState } from 'react';

export default function FlashCardPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showAllTitle, setShowAllTitle] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    setAllCards(shuffledCards);
  }

  function toggleRadioClick() {
    setShowAllTitle(currentShowAllTitle => !currentShowAllTitle);

    const updatedCards = [...allCards].map(c => ({
      ...c,
      showTitle: !showAllTitle,
    }));

    setAllCards(updatedCards);
  }

  function toggleFlashCardClick(cardId) {
    const updatedCards = [...allCards];
    const index = updatedCards.findIndex(c => c.id === cardId);
    updatedCards[index].showTitle = !updatedCards[index].showTitle;

    setAllCards(updatedCards);
  }

  return (
    <>
      <Header>flash-cards-v1.1</Header>
      <Main>
        <div className="text-center m-4">Lifting State Up</div>
        <div className="text-center mb-4">
          <Button onClick={handleButtonClick}>Shuffle Cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowAllTitle"
            name="showInfo"
            checked={showAllTitle}
            onChange={toggleRadioClick}
          >
            Show Title
          </RadioButton>

          <RadioButton
            id="radioButtonShowAllDescription"
            name="showInfo"
            checked={!showAllTitle}
            onChange={toggleRadioClick}
          >
            Show Description
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showTitle={showTitle}
                onClick={toggleFlashCardClick}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
