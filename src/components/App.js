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

const initialFilters = {
  topic: '',
  level: 'all',
};

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
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      // console.log(savedFilters);
      this.setState({ filters: JSON.parse(savedFilters) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.state:', this.state);
    // console.log('prevState', prevState);
    // console.log(prevState.filters === this.state.filters);

    if (prevState.filters !== this.state.filters) {
      //  console.log('Filters Changes');

      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
      // this.setState({quizItems: []})
    }
  }
  // }
  resetFilters = () => {
    this.setState({
      filters: initialFilters,
    });
  };

  componentWillUmount() {}

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

  render() {
    const { filters, quizItems } = this.state;
    return (
      <Layout>
        <SearchBar
          topicFilter={filters.topic}
          onChangeTopic={this.changeTopicFilter}
        />
        <QuizForm onAdd={this.addQuiz} />
        <QuizList items={this.state.quizItems} onDelete={this.handleDelete} />
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
