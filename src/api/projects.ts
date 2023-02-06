import { http, type IRequestOptions } from 'lib';

import type { XProjectAttr } from '@kite/jira-server';
import type { ISearchProjectListType } from 'pages/projects/index.type';

/*
 * 查询项目列表接口
 * @param data
 * @returns
 */
export async function getProjectListApi(
  data: ISearchProjectListType | null,
  extralOptions: IRequestOptions<ISearchProjectListType | null>
) {
  return http<XProjectAttr[], ISearchProjectListType | null>('project/list', {
    data,
    ...extralOptions
  });
}
