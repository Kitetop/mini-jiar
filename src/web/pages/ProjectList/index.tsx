import qs from 'qs';
import { getApiUrl } from '@lib/index';
import { useEffect, useState } from 'react';
import { IUserInfo, XProjectAttr } from 'types';
import { List } from './List';
import { SearchPanel } from './SearchPanel';

const api = getApiUrl();

export const ProjectList = () => {
  const [query, setQuery] = useState({
    projectName: '',
    id: ''
  });

  const [projectList, setProjectList] = useState<XProjectAttr[]>([]);

  const [userList, setUserList] = useState<IUserInfo[]>([]);

  /**
   * 请求项目列表
   */
  useEffect(() => {
    fetch(`${api}/projects?projectName=${qs.stringify(query)}`).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  }, [query]);

  /**
   * 请求用户列表
   */
  useEffect(() => {
    fetch(`${api}/users`).then(async response => {
      if (response.ok) {
        setUserList(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel></SearchPanel>
      <List></List>
    </>
  );
};
