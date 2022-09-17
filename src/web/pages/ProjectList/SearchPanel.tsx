import { useState } from 'react';
import type { IUserInfo } from 'types';

export const SearchPanel = () => {
  const [query, setQuery] = useState({
    name: '',
    id: ''
  });
  const [users, setUsers] = useState<IUserInfo[]>([]);
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={query.name}
          onChange={evt =>
            setQuery({
              ...query,
              name: evt.target.name
            })
          }
        ></input>
        <select value={query.id} onChange={evt => setQuery({ ...query, id: evt.target.name })}>
          {users.map(user => (
            <option value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
