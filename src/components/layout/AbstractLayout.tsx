import { Children, ReactElement, cloneElement, type CSSProperties } from 'react';
import { inRange, merge } from '@kite/utils';
export type IReactChildrenType = (ReactElement | ReactElement[]) & { length?: number };

export interface IAbstractLayoutPropsAttr {
  children: IReactChildrenType;
  style?: CSSProperties;
  className?: string;
  height?: string | number;
  width?: string | number;
}

export const AbstractLayout = () => <></>;

AbstractLayout.setStyles = (props: ReactElement['props'], style: CSSProperties) => {
  return merge(props, { style });
};

/**
 * 对子元素的props进行处理，对属性做出一定的修改
 * @param children
 * @param callback
 * @returns
 */
AbstractLayout.wrapperChildren = (
  children: IReactChildrenType,
  callback: (props: ReactElement['props'], index: number) => ReactElement['props']
) => {
  return Children.map(children, (child, i) => {
    // clone 一下，方便操作props
    const props = Object.assign({}, child.props);
    return cloneElement(child, callback(props, i));
  });
};

/**
 * 处理一下itemsSize和子元素的对应关系
 * @param itmesSize
 * @returns
 */
AbstractLayout.calculateItemsInset = (itmesSize: (string | number)[]) => {
  const dealWithItemsSize: Record<number | '_auto', number> = {
      _auto: -1
    },
    len = itmesSize.length - 1;
  itmesSize.reduce((prev: number, curv, i) => {
    if (curv === 'auto') {
      dealWithItemsSize[i] = 0;
      dealWithItemsSize._auto = i;
      return 0;
    }
    dealWithItemsSize[i] = ~~curv + prev;
    return dealWithItemsSize[i];
  }, 0);
  /** 缓存先前的计算结果，提高执行效率 */
  return (index: number) => {
    return {
      // 只有itemsSize设置有效的数字、数字字符串时才会添加width属性
      ...(~~itmesSize[index] && { width: ~~itmesSize[index] }),
      // 只有位于auto左边的items才需要设置left属性
      ...(dealWithItemsSize._auto >= index && { left: ~~dealWithItemsSize[index - 1] }),
      // 只有当auto大于0小于等于index时才需要设置right属性
      ...(inRange(dealWithItemsSize._auto, 0, index + 1) && {
        right: ~~(dealWithItemsSize[len] - dealWithItemsSize[index])
      })
    };
  };
};
