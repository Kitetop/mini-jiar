import { getApiUrl } from '@web/lib';
import { useCallback, useEffect, useState } from 'react';
import type { IUserInfo, XProjectAttr } from 'types';
import { List } from './List';
import SearchPanel from './SearchPanel';
import { isEmpty, omitEmptyObjectValue, stringifyParams } from 'core';
import { XSearchProjectListType } from './index.type';

const api = getApiUrl();

export const ProjectList = () => {
  const [query, setQuery] = useState<XSearchProjectListType>({
    userId: '',
    projectName: ''
  });

  const [projectList, setProjectList] = useState<XProjectAttr[]>([]);

  const [userList, setUserList] = useState<IUserInfo[]>([]);

  /**
   * 变更查找值的函数
   */
  const changeSearchQuery = useCallback((v: XSearchProjectListType) => {
    setQuery(v);
  }, []);

  /**
   * 请求项目列表
   */
  useEffect(() => {
    const params = stringifyParams(
      omitEmptyObjectValue(
        {
          projectName: query.projectName,
          belongPerson: query.userId
        },
        value => isEmpty(value)
      )
    );
    fetch(`${api}/projects?${params}`).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  }, [query]);

  /**
   * 请求用户列表
   */
  useEffect(() => {
    fetch(`${api}/users?`).then(async response => {
      if (response.ok) {
        setUserList(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel
        users={userList}
        query={query}
        changeSearchQuery={changeSearchQuery}
      ></SearchPanel>
      <List users={userList} projects={projectList}></List>
    </>
  );
};
