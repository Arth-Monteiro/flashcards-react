import { useState, useEffect } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import FlashCards from './../components/FlashCards';
import FlashCard from './../components/FlashCard';
import RadioButton from './../components/RadioButton';
import Button from './../components/Button';
import Header from './../components/Header';
import Main from './../components/Main';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';

import Loading from '../components/Loading';
import Error from '../components/Error';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
  apiCreateFlashCard,
  apiDeleteFlashCard,
  apiGetAllFlashCards,
  apiUpdateFlashCard,
} from '../services/apiService';

export default function FlashCardPage() {
  // Backend Cards
  const [allCards, setAllCards] = useState([]);
  // Frontend Cards (to edit)
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [showAllTitle, setShowAllTitle] = useState(true);

  useEffect(() => {
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    (async () => {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function setAllTitle() {
    toggleRadioClick();
  }

  function setAllDesc() {
    toggleRadioClick(false);
  }

  function toggleRadioClick(status = true) {
    const updatedCards = [...studyCards].map(c => ({
      ...c,
      showTitle: status,
    }));

    setShowAllTitle(status);
    setStudyCards(updatedCards);
  }

  function toggleFlashCardClick(cardId) {
    const updatedCards = [...studyCards];
    const index = updatedCards.findIndex(c => c.id === cardId);
    updatedCards[index].showTitle = !updatedCards[index].showTitle;

    setStudyCards(updatedCards);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleOnEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  async function handleOnDeleteFlashCard(cardId) {
    try {
      // Backend
      await apiDeleteFlashCard(cardId);
      // Frontend
      setAllCards(allCards.filter(card => card.id !== cardId));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleOnPersist(title, description) {
    if (createMode) {
      try {
        //Backend
        const newFlashCard = await apiCreateFlashCard(title, description);

        //Insert Backend
        setAllCards([...allCards, newFlashCard]);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // Edit
        // Backend
        await apiUpdateFlashCard(selectedFlashCard.id, title, description);
        // Frontend
        setAllCards(
          allCards.map(card => {
            if (selectedFlashCard.id === card.id) {
              return { ...card, title: title, description: description };
            }
            return card;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  } else if (!loading) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>List</Tab>
            <Tab>Register</Tab>
            <Tab>Study</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleOnDeleteFlashCard}
                  onEdit={handleOnEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <div className="my-4">
              <Button onClick={handleNewFlashCard}>New FlashCard</Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handleOnPersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
            <div className="text-center m-4">
              <h2>Lifting State Up</h2>
              <h3>RadioButton define estado sempre que clicado</h3>
            </div>
            <div className="text-center mb-4">
              <Button onClick={handleShuffle}>Shuffle Cards</Button>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowAllTitle"
                name="showInfo"
                checked={showAllTitle}
                onClick={setAllTitle}
                onChange={setAllTitle}
              >
                Show Title
              </RadioButton>

              <RadioButton
                id="radioButtonShowAllDescription"
                name="showInfo"
                checked={!showAllTitle}
                onClick={setAllDesc}
                onChange={setAllDesc}
              >
                Show Description
              </RadioButton>
            </div>
            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>flash-cards-v2</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
