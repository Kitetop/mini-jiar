import { rest } from 'msw';
import { getProjectsModle } from './model';
import { isEmpty, omitObjectValueByFunc } from '@kite/utils';

export function getProjectList() {
  return rest.get('project/list', async (req, res, ctx) => {
    const projectModle = getProjectsModle();
    // 取得请求参数
    const projectName = req.url.searchParams.get('projectName'),
      belongPerson = req.url.searchParams.get('belongPerson');
    let hasSearchQuery = false;
    // 过滤掉参数中的空值并判断是否有过滤条件
    const params = omitObjectValueByFunc(
      {
        projectName: projectName && `${projectName}%`,
        belongPerson
      },
      v => {
        const empty = isEmpty(v);
        if (!empty) hasSearchQuery = true;
        return empty;
      }
    );
    // 检索符合条件的project list
    if (hasSearchQuery) {
      const projects = projectModle.find(params);
      return res(ctx.status(200), ctx.json(projects));
    }
    // 查找全部项目列表
    return res(ctx.status(200), ctx.json(projectModle.findAll()));
  });
}
