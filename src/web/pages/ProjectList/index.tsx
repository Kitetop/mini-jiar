import { getApiUrl } from '@web/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { List } from './List';
import SearchPanel from './SearchPanel';
import { XUserInfoAttr, XProjectAttr } from '@kite/jira-server';
import { isEmpty, omitEmptyObjectValue } from '@kite/utils';
import { stringifyParams } from 'core';
import { useMount } from 'hooks';

import type { XSearchProjectListType } from './index.type';

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

/**
 * 根据条件查询符合条件的 projectList
 * @param v
 * @returns
 */
function requestProjectLists(v: XSearchProjectListType) {
  return fetch(`${api}/projects?${getSearchProjectParams(v)}`);
}

export const ProjectList = () => {
  const searchQuery = useRef<XSearchProjectListType>({
    userId: '',
    projectName: ''
  });

  const [projectList, setProjectList] = useState<XProjectAttr[]>([]);

  const [userList, setUserList] = useState<XUserInfoAttr[]>([]);

  /**
   * 变更查找值的函数
   */
  const changeSearchQuery = useCallback((v: XSearchProjectListType) => {
    requestProjectLists(v).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  }, []);

  /**
   * 请求项目列表
   */
  useMount(() => {
    requestProjectLists(searchQuery.current).then(async response => {
      if (response.ok) {
        setProjectList(await response.json());
      }
    });
  });

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
      <SearchPanel users={userList} changeSearchQuery={changeSearchQuery}></SearchPanel>
      <List users={userList} projects={projectList}></List>
    </>
  );
};
