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
  const [showTitle, setShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    setAllCards(shuffledCards);
  }

  function toggleRadioClick() {
    setShowTitle(currentShowTitle => !currentShowTitle);
  }

  return (
    <>
      <Header>flash-cards-v1</Header>
      <Main>
        <div className="text-center m-4">Prop - useEffect</div>
        <div className="text-center mb-4">
          <Button onClick={handleButtonClick}>Shuffle Cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            checked={showTitle}
            onChange={toggleRadioClick}
          >
            Show Title
          </RadioButton>

          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            checked={!showTitle}
            onChange={toggleRadioClick}
          >
            Show Description
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description }) => {
            return (
              <FlashCard
                key={id}
                title={title}
                description={description}
                showFcTitle={showTitle}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
