import { memo } from 'react';
import type { IUserInfo } from 'types';
import { XSearchProjectListType } from './index.type';

interface ISearchPanelPropsType {
  users: IUserInfo[];
  query: XSearchProjectListType;
  changeSearchQuery: (v: XSearchProjectListType) => void;
}

const SearchPanel = ({ users, query, changeSearchQuery }: ISearchPanelPropsType) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={query.projectName}
          onChange={evt => {
            changeSearchQuery({
              ...query,
              projectName: evt.target.value
            });
          }}
        ></input>
        <select
          value={query.userId}
          onChange={evt => changeSearchQuery({ ...query, userId: evt.target.value })}
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
