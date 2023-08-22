import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
// import { HiBriefcase, HiArrowCircleLeft, HiAdjustments } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';
// import { StateExample } from './StateExample/StateExample';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };
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
      if (filters.level === 'all') {
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });
  };
  render() {
    const { filters } = this.state;
    const visibleQuizItems = this.getVisibleQuizItems();
    return (
      <Layout>
        <SearchBar
          topicFilter={filters.topic}
          levelFilter={filters.level}
          onChangeTopic={this.changeTopicFilter}
          onChangeLevel={this.changeLevelFilter}
        />
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
