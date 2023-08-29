import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter/LevelFilter';
import { TopicFilter } from './TopicFilter/TopicFilter';
// import { HiBriefcase, HiArrowCircleLeft, HiAdjustments } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';
// import { StateExample } from './StateExample/StateExample';

const initialFilters = {
  topic: '',
  level: 'all',
};
const localStorageKey = 'quiz-filters';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: initialFilters,
  };
  changeTopicFilter = newTopic => {
    console.log(newTopic);
  };

  componentDidMount() {
    console.log('componentDidMount');
    const savedFilters = localStorage.getItem(localStorageKey);
    if (savedFilters !== null) {
      // console.log(savedFilters);
      this.setState({ filters: JSON.parse(savedFilters) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters: prevFilters } = prevState;
    const { filters: nextFilters } = this.state;

    // console.log('this.state:', this.state.filters);
    // console.log('prevState', prevState.filters);
    // console.log(prevState.filters === this.state.filters);

    if (prevFilters !== nextFilters) {
      localStorage.setItem(localStorageKey, JSON.stringify(this.state.filters));
      // this.setState({quizItems: []})
    }
  }
  // }
  resetFilters = () => {
    this.setState({
      filters: initialFilters,
    });
  };

  // eslint-disable-next-line no-dupe-class-members
  changeTopicFilter = newTopic => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        },
      };
    });
  };

  changeLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel,
        },
      };
    });
  };

  handleDelete = quizId => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
      };
    });
  };

  addQuiz = newQuiz => {
    this.setState(prevState => {
      return {
        quizItems: [...prevState.quizItems, newQuiz],
      };
    });
  };
  getVisibleQuizItems = () => {
    const { filters, quizItems } = this.state;
    const lowerCaseTopic = filters.topic.toLowerCase();
    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
      const hasMatchingLevel = quiz.level === filters.level;
      return filters.level === 'all' ? hasTopic : hasTopic && hasMatchingLevel;
    });
  };
  render() {
    console.log('componentDidMount');
    const { filters } = this.state;
    const visibleQuizItems = this.getVisibleQuizItems();
    return (
      <Layout>
        <SearchBar onReset={this.resetFilters}>
          <TopicFilter
            value={filters.topic}
            onChange={this.changeTopicFilter}
          />
          <LevelFilter
            value={filters.level}
            onChange={this.changeLevelFilter}
          />
        </SearchBar>
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
        {/* <IconButton variant="primary" size="sm">
        <HiBriefcase />
      </IconButton> */}
        {/* <IconButton variant="secondary" size="md">
        <HiArrowCircleLeft />
      </IconButton> */}
        {/* <IconButton variant="secondary" size="lg">
        <HiAdjustments />
      </IconButton> */}
        {/* <StateExample /> */}
        <GlobalStyle />
      </Layout>
    );
  }
}
// class App extends Component {
//   state = {
//     good: 0,
//     bad: 0,
//     neutral: 0,
//   };

// handleX = type => {
//   this.setState(prevState => {
//     return {
//       [type]: prevState[type] + 1,

//   }})
// }
// render(){
//   return (<div>
//     <button onClick={() => this.handleX('good')}>Good</button>
//     <button onClick={() => this.handleX('bad')}>Bad</button>
//     <button onClick={() => this.handleX('neutral')}>Neutral</button>
//   </div>)
// }}
