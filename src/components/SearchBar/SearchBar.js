import { TopicFilter } from '../TopicFilter/TopicFilter';
import { LevelFilter } from '../LevelFilter/LevelFilter';
import { Wrapper } from './SearchBar.styled';

export const SearchBar = ({
  topicFilter,
  levelFilter,
  onChangeTopic,
  onChangeLevel,
}) => {
  return (
    <Wrapper>
      <TopicFilter value={topicFilter} onChange={onChangeTopic} />
      <LevelFilter value={levelFilter} onChange={onChangeLevel} />
    </Wrapper>
  );
};
