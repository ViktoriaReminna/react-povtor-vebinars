import { QuizList } from './QuizList/QuizList';

import { SearchBar } from './SearchBar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter/LevelFilter';
import { TopicFilter } from './TopicFilter/TopicFilter';
import { createQuiz, deleteQuiz, fetchQuizzes } from 'api';
// import { HiBriefcase, HiArrowCircleLeft, HiAdjustments } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';
// import { StateExample } from './StateExample/StateExample';

const localStorageKey = 'quiz-filters';

const initialFilters = {
  topic: '',
  level: 'all',
};

export class App extends Component {
//   state = {
//     quizItems: [],
//     filters: initialFilters,
//     loading: false,
//   };

  async componentDidMount() {
    // console.log('componentDidMount');
    const savedFilters = localStorage.getItem(localStorageKey);
    if (savedFilters !== null) {
      // console.log(savedFilters);
      this.setState({ filters: JSON.parse(savedFilters) });
    }
    // try {
    //   this.setState({ loading: true });

    //   const quizItems = await fetchQuizzes();

    //   this.setState({ quizItems, loading: false });
    // } catch (error) {
    //   console.log(error);
    // }
  }
//   componentDidUpdate(prevProps, prevState) {
//     const { filters: prevFilters } = prevState;
//     const { filters: nextFilters } = this.state;

//     // console.log('this.state:', this.state.filters);
//     // console.log('prevState', prevState.filters);
//     // console.log(prevState.filters === this.state.filters);

//     if (prevFilters !== nextFilters) {
//       localStorage.setItem(localStorageKey, JSON.stringify(this.state.filters));
//       // this.setState({quizItems: []})
//     }
//   }
  // }
//   resetFilters = () => {
//     this.setState({
//       filters: initialFilters,
//     });
//   };

  // eslint-disable-next-line no-dupe-class-members
//   changeTopicFilter = newTopic => {
//     this.setState(prevState => {
//       return {
//         filters: {
//           ...prevState.filters,
//           topic: newTopic,
//         },
//       };
//     });
//   };

//   changeLevelFilter = newLevel => {
//     this.setState(prevState => {
//       return {
//         filters: {
//           ...prevState.filters,
//           level: newLevel,
//         },
//       };
//     });
//   };

//   handleDelete = async quizId => {
//     try {
//       const deletedQuiz = await deleteQuiz(quizId);
//       this.setState(prevState => {
//         return {
//           quizItems: prevState.quizItems.filter(
//             quiz => quiz.id !== deletedQuiz.id
//           ),
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   addQuiz = async newQuiz => {
//     try {
//       const createdQuiz = await createQuiz(newQuiz);
//       // console.log(newQuiz);
//       this.setState(prevState => {
//         return {
//           quizItems: [...prevState.quizItems, createdQuiz],
//         };
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getVisibleQuizItems = () => {
//     const { filters, quizItems } = this.state;
//     const lowerCaseTopic = filters.topic.toLowerCase();
//     return quizItems.filter(quiz => {
//       const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
//       const hasMatchingLevel = quiz.level === filters.level;
//       return filters.level === 'all' ? hasTopic : hasTopic && hasMatchingLevel;
//     });
//   };
//   render() {
//     const { filters, loading } = this.state;
//     const visibleQuizItems = this.getVisibleQuizItems();
//     return (
//       <Layout>
//         <SearchBar onReset={this.resetFilters}>
//           <TopicFilter
//             value={filters.topic}
//             onChange={this.changeTopicFilter}
//           />
//           <LevelFilter
//             value={filters.level}
//             onChange={this.changeLevelFilter}
//           />
//         </SearchBar>
//         <QuizForm onAdd={this.addQuiz} />
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
//         )}

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
        {/* <GlobalStyle />
      </Layout>
    ); */}
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
