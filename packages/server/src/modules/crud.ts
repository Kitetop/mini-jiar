export type IAbstractModel<T> = { [K in keyof T]?: T[K] };

export class AbstractCrud<T extends { [key: string | number]: unknown }> {
  protected model: T[];

  protected primary = 'id';

  protected constructor(model: T[], primary?: string) {
    // 浅拷贝一下 避免污染全局常量
    this.model = [...model];
    primary && (this.primary = primary);
  }

  /**
   * 根据id查找符合条件的结构
   * @param id
   * @returns
   */
  public findById(id: string | number): T | undefined {
    const result = this.model.filter(v => {
      return v[this.primary] === id;
    });

    return result[0];
  }

  /**
   * 根据model数据格式来查找数据
   * @param model 如果值的末尾存在%，则启用模糊搜索
   * @returns
   */
  public find(model: Partial<T>): T[] {
    const keys = Object.keys(model);

    return this.model.filter(m => {
      return keys.every(k => {
        // 新构建model中的值
        const v = model[k];
        // model中记录的原始值
        const origin = m[k];

        if (typeof v === 'string' && typeof origin === 'string' && v.charAt(v.length - 1) === '%') {
          return origin.includes(v.slice(0, v.length - 1));
        }

        return origin === model[k];
      });
    });
  }

  /**
   * 保存或者更新结果
   * @param model
   */
  public save(model: T) {
    const id = <string | number>model[this.primary];
    if (this.findById(id)) {
      // 如果model中已经存在，那么则更新 保持跟之前一样的顺序
      this.model = this.model.map(m => {
        if (m[this.primary] === id) {
          return { ...m, ...model };
        }
        return m;
      });
      return;
    }
    // 如果不存在，那么则新增记录
    this.model.push(model);
  }

  /**
   * 获得全量的数据
   * @returns
   */
  public findAll(): T[] {
    return [...this.model];
  }
}
