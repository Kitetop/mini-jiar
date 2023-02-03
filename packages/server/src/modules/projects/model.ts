import { AbstractCrud, IAbstractModel } from '../crud';

import type { XProjectAttr } from '../index.type';

export const projects: XProjectAttr[] = [
  { id: 'PRJ00001', projectName: '开水沸腾计划', belongPerson: '10000', createdTime: 'xxxxxxx' },
  { id: 'PRJ00002', projectName: '母猪爆炸计划', belongPerson: '10001', createdTime: 'xxxxxxx' }
];

class ProjectsModle extends AbstractCrud<IAbstractModel<XProjectAttr>> {
  protected static instance: ProjectsModle;

  protected constructor(model: XProjectAttr[], primary?: string) {
    super(model, primary);
  }

  public static getInstance(model: XProjectAttr[], primary?: string) {
    if (!this.instance) {
      this.instance = new ProjectsModle(model, primary);
    }

    return this.instance;
  }
}

export const getProjectsModle = () => ProjectsModle.getInstance(projects);
