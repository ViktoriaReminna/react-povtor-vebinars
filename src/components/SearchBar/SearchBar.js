import { TopicFilter } from '../TopicFilter/TopicFilter';
import { LevelFilter } from '../LevelFilter/LevelFilter';
import { Wrapper } from './SearchBar.styled';

export const SearchBar = ({ topicFilter }) => {
  return (
    <Wrapper>
      <TopicFilter value={topicFilter} />
      <LevelFilter />
    </Wrapper>
  );
};
