import {
  Children,
  ReactElement,
  cloneElement,
  useState,
  type CSSProperties,
  type PropsWithChildren
} from 'react';
import { inRange, merge } from '@kite/utils';
export type IReactChildrenType = ReactElement[] | ReactElement;

export interface IAbstractLayoutPropsAttr extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  height?: string | number;
  width?: string | number;
}

/**
 * 抽象布局提供的共用的处理属性的能力
 * @returns
 */
export function useAbstractLayout<T extends ReactElement['props']>() {
  /**
   * 将自定义样式合并进元素的props中
   * @param props
   * @param style
   * @returns
   */
  const mergeStyle2Props = (props: T, style: CSSProperties) => {
    return merge(props, { style });
  };

  /**
   * 对子元素的props进行处理，对属性做出一定的修改
   * @param children
   * @param callback
   * @returns
   */
  const wrapperChildren = (
    children: IReactChildrenType,
    callback: (props: T, index: number) => ReactElement['props']
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
  const calculateItemsInset = (itmesSize: (string | number)[]) => {
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
        ...((dealWithItemsSize._auto >= index || dealWithItemsSize._auto === -1) && {
          left: ~~dealWithItemsSize[index - 1]
        }),
        // 只有当auto大于0小于等于index时才需要设置right属性
        ...(inRange(dealWithItemsSize._auto, 0, index + 1) && {
          right: ~~(dealWithItemsSize[len] - dealWithItemsSize[index])
        })
      };
    };
  };

  return {
    mergeStyle2Props,
    wrapperChildren,
    calculateItemsInset
  };
}

/**
 * 基础组件提供的共用api
 * @returns
 */
export function useBaseWidget() {
  const [disabled, updateDisabledStatus] = useState(false);
  const [visiable, updateVisiableStatus] = useState(true);
  // 设置组件状态是否可用
  const setEnable = (statue = true) => {
    if (statue === disabled) updateDisabledStatus(statue);
  };
  // 设置组件是否可见
  const setVisable = (statue = true) => {
    if (statue !== visiable) updateVisiableStatus(statue);
  };

  return {
    disabled,
    setEnable,
    visiable,
    setVisable
  };
}
