import { memo } from 'react';
import { List } from './List';
import { SearchPanel } from './SearchPanel';

export const ProjectList = memo((): JSX.Element => {
  return (
    <>
      <SearchPanel></SearchPanel>
      <List></List>
    </>
  );
});
