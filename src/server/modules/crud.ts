export class AbstractCrud<T extends Record<string, any>> {
  protected model: T[];

  protected primary = 'id';

  protected static instance: AbstractCrud<Record<string, unknown>>;

  protected constructor(model: T[], primary?: string) {
    // 浅拷贝一下 避免污染全局常量
    this.model = [...model];
    primary && (this.primary = primary);
  }

  public static getInstance<S extends Record<string, any>>(model: S[], primary?: string) {
    if (!this.instance) {
      this.instance = new AbstractCrud<S>(model, primary);
    }
    return this.instance;
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

  public findByEntity(): T[] {
    return [];
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
