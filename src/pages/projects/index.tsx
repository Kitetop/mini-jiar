import { useCallback, useState } from 'react';
import { omitEmptyObjectValue } from '@kite/utils';
import { useMount, useClientWithAuth } from 'hooks';
import { getUserListApi, getProjectListApi } from 'api';
import { List } from './list';
import SearchPanel from './search-panel';

import type { ISearchProjectListType } from './index.type';
import type { XUserInfoAttr, XProjectAttr } from '@kite/jira-server';

export const ProjectList = () => {
  const [projectList, setProjectList] = useState<XProjectAttr[]>([]);

  const [userList, setUserList] = useState<XUserInfoAttr[]>([]);

  const projectListClient = useClientWithAuth(getProjectListApi);
  const userListClient = useClientWithAuth(getUserListApi);

  /**
   * 变更查找值的函数
   */
  const changeSearchQuery = useCallback(
    (v: ISearchProjectListType) => {
      projectListClient(
        omitEmptyObjectValue({
          projectName: v.projectName,
          belongPerson: v.userId
        }) as ISearchProjectListType
      ).then(setProjectList);
    },
    [projectListClient]
  );

  /**
   * 请求项目列表
   */
  useMount(() => {
    userListClient().then(setUserList);
    projectListClient(null).then(setProjectList);
  });

  return (
    <>
      <SearchPanel users={userList} changeSearchQuery={changeSearchQuery}></SearchPanel>
      <List users={userList} projects={projectList}></List>
    </>
  );
};
