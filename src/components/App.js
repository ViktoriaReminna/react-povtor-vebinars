import { QuizList } from './QuizList/QuizList';

import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter/LevelFilter';
import { TopicFilter } from './TopicFilter/TopicFilter';
import { createQuiz, deleteQuiz, fetchQuizzes } from 'api';
import { useEffect, useState } from 'react';

const localStorageKey = 'quiz-filters';

const initialFilters = {
  topic: '',
  level: 'all',
};
const getInitialFilters = () => {
  const savedFilters = localStorage.getItem(localStorageKey);
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return initialFilters;
};
export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  // useState(() => {
  // return initialQuizItems.map;(item=> item*2)
  // });
  const [filters, setFilters] = useState(getInitialFilters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);

        const quizItems = await fetchQuizzes();
        setQuizItems(quizItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
  }, [filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const changeTopicFilter = newTopic => {
    setFilters(prevState => ({ ...prevState.filters, topic: newTopic }));
  };
  const changeLevelFilter = newLevel => {
    setFilters(prevState => ({
      ...prevState.filters,
      level: newLevel,
    }));
  };

  const addQuiz = async newQuiz => {
    try {
      const createdQuiz = await createQuiz(newQuiz);
      // console.log(newQuiz);
      setQuizItems(prevState => [...prevState, createdQuiz]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuiz = async quizId => {
    try {
      const deletedQuiz = await deleteQuiz(quizId);
      setQuizItems(prevState =>
        prevState.filter(quiz => quiz.id !== deletedQuiz.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getVisibleQuizItems = () => {
    const lowerCaseTopic = filters.topic.toLowerCase();
    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
      const hasMatchingLevel = quiz.level === filters.level;
      return filters.level === 'all' ? hasTopic : hasTopic && hasMatchingLevel;
    });
  };

  const visibleQuizItems = getVisibleQuizItems();
  return (
    <Layout>
      <SearchBar onReset={resetFilters}>
        <TopicFilter value={filters.topic} onChange={changeTopicFilter} />
        <LevelFilter value={filters.level} onChange={changeLevelFilter} />
      </SearchBar>
      <QuizForm onAdd={addQuiz} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <QuizList items={visibleQuizItems} onDelete={deleteQuiz} />
      )}

      {/* <IconButton variant="primary" size="sm">
        <HiBriefcase />
      </IconButton> 
         <IconButton variant="secondary" size="md">
        <HiArrowCircleLeft />
      </IconButton>
         <IconButton variant="secondary" size="lg">
        <HiAdjustments />
      </IconButton> 
         <StateExample />  */}
      <GlobalStyle />
    </Layout>
  );
};
