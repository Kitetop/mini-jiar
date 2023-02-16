import { isEmpty, isArray } from '@kite/utils';
import {
  useAbstractLayout,
  type IReactChildrenType,
  type IAbstractLayoutPropsAttr
} from './AbstractLayout';

export interface IHTapeLayoptPropsAttr extends IAbstractLayoutPropsAttr {
  itemsSize?: (string | number)[];
  height: string | number;
  children?: IReactChildrenType;
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
  itemsSize = [],
  height,
  className,
  style
}: IHTapeLayoptPropsAttr) => {
  const { calculateItemsInset, wrapperChildren, mergeStyle2Props } = useAbstractLayout();

  /**
   * 得到经过wrapper的子元素
   * @returns
   */
  const getWrapperChildren = (items: (string | number)[]) => {
    // 确定一下children的个数，不设置时取0
    const length = isArray(children) ? children.length : ~~!isEmpty(children);

    /**
     * 简单的处理一下itemsSize与children的对应关系
     */
    if (length > 1 && itemsSize.length !== length) {
      throw new Error(`请给组件设置正确itemsSize属性, 期待的itemsSize长度为: ${length}`);
    }
    const dealWithItemsFunc = calculateItemsInset(items);
    return (
      children &&
      wrapperChildren(children, (props, index) =>
        mergeStyle2Props(props, {
          ...dealWithItemsFunc(index),
          position: 'absolute',
          top: 0,
          bottom: 0
        })
      )
    );
  };

  return (
    <div className={className} style={{ ...style, position: 'relative', height }}>
      {getWrapperChildren(itemsSize)}
    </div>
  );
};
