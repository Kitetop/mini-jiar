import { getApiUrl } from '@web/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { IUserInfo, XProjectAttr } from 'types';
import { List } from './List';
import SearchPanel from './SearchPanel';
import { isEmpty, omitEmptyObjectValue, stringifyParams } from 'core';
import { XSearchProjectListType } from './index.type';

const api = getApiUrl();

/**
 * 获得请求参数
 * @param params
 * @returns
 */
function getSearchProjectParams(params: XSearchProjectListType) {
  return stringifyParams(
    omitEmptyObjectValue(
      {
        projectName: params.projectName,
        belongPerson: params.userId
      },
      value => isEmpty(value)
    )
  );
}

export const ProjectList = () => {
  const query = useRef<XSearchProjectListType>({
    userId: '',
    projectName: ''
  });

  const [projectList, setProjectList] = useState<XProjectAttr[]>([]);

  const [userList, setUserList] = useState<IUserInfo[]>([]);

  /**
   * 变更查找值的函数
   */
  const changeSearchQuery = useCallback((v: XSearchProjectListType) => {
    query.current = v;
    const params = getSearchProjectParams(v);
    fetch(`${api}/projects?${params}`).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  }, []);

  /**
   * 请求项目列表
   */
  useEffect(() => {
    const params = getSearchProjectParams(query.current);
    fetch(`${api}/projects?${params}`).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  }, []);

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
        query={query.current}
        changeSearchQuery={changeSearchQuery}
      ></SearchPanel>
      <List users={userList} projects={projectList}></List>
    </>
  );
};
