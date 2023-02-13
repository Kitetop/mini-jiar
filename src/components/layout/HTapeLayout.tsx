import { AbstractLayout, type IAbstractLayoutPropsAttr } from './AbstractLayout';

export interface IHTapeLayoptPropsAttr extends IAbstractLayoutPropsAttr {
  itemsSize?: (string | number)[];
  height: string | number;
}
/**
 * 水平布局，支持设置itemsSize来决定特定items自动撑满剩余空间
 * @example ```
 * // itemsSize长度和子元素个数要一致，itemsSize只允许存在一个auto值
 * // 当itemsSize缺省时，只允许一个子元素
 * <HTapeLayout itemsSize={[200, 300, 'auto']} height={200}>
        <div>...</div>
        <div>...</div>
        <div>...</div>
    </HTapeLayout>
    ```
 * @param
 * @returns
 */
export const HTapeLayout = ({
  children,
  itemsSize = ['auto'],
  height,
  className,
  style
}: IHTapeLayoptPropsAttr) => {
  const { calculateItemsInset, wrapperChildren, setStyles } = AbstractLayout;

  /**
   * 简单的处理一下itemsSize与children的对应关系
   */
  if (itemsSize.length !== (children?.length || 1)) {
    throw new Error(
      `期待的itemsSize长度: ${children?.length || 1}, 实际itemsSize的长度: ${
        itemsSize.length
      }, 请给组件设置正确itemsSize属性`
    );
  }

  /**
   * 得到经过wrapper的子元素
   * @returns
   */
  const getWrapperChildren = (items: (string | number)[]) => {
    const dealWithItemsFunc = calculateItemsInset(items);
    return wrapperChildren(children, (props, index) =>
      setStyles(props, { ...dealWithItemsFunc(index), position: 'absolute', top: 0, bottom: 0 })
    );
  };

  return (
    <div className={className} style={{ ...style, position: 'relative', height }}>
      {getWrapperChildren(itemsSize)}
    </div>
  );
};
