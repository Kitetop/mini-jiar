import { useDebounceFn } from 'hooks';
import { memo, useState } from 'react';

import type { IUserInfo } from 'types';
import type { XSearchProjectListType } from './index.type';

interface ISearchPanelPropsType {
  users: IUserInfo[];
  changeSearchQuery: (v: XSearchProjectListType) => void;
}

const SearchPanel = ({ users, changeSearchQuery }: ISearchPanelPropsType) => {
  const [searchQuery, updateSearchQuery] = useState<XSearchProjectListType>({
    userId: '',
    projectName: ''
  });

  const { run } = useDebounceFn(changeSearchQuery);

  return (
    <form action="">
      <div>
        <input
          type="text"
          value={searchQuery.projectName}
          onChange={evt => {
            const params = {
              ...searchQuery,
              projectName: evt.target.value
            };
            updateSearchQuery(params);
            run(params);
          }}
        ></input>
        <select
          value={searchQuery.userId}
          onChange={evt => {
            const params = {
              ...searchQuery,
              userId: evt.target.value
            };
            updateSearchQuery(params);
            changeSearchQuery(params);
          }}
        >
          <option value="">负责人</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default memo(SearchPanel);
