import { ReactElement } from 'react';
import {
  useAbstractLayout,
  type IAbstractLayoutPropsAttr,
  type IReactChildrenType
} from './AbstractLayout';

export interface IHFlexTapeLayoptPropsAttr extends IAbstractLayoutPropsAttr {
  itemsSize?: (string | number)[];
  height: string | number;
  children?: IReactChildrenType;
}
export const HFlexTapeLayout = ({
  children,
  itemsSize = [],
  height,
  className,
  style
}: IHFlexTapeLayoptPropsAttr) => {
  const { calculateItemsInset, wrapperChildren, mergeStyle2Props } = useAbstractLayout();
  const getWrapperChildren = (items: (string | number)[]) => {
    const dealWithItemsFunc = calculateItemsInset(items);
    return (
      children &&
      wrapperChildren(children, (props: ReactElement['props'], index) => {
        const { auto, width } = dealWithItemsFunc(index);
        if (index === auto) {
          props.className = `${className ?? ''} flex-fill`;
        }
        return mergeStyle2Props(props, { width });
      })
    );
  };
  return (
    <div className={`${className ?? ''} flex flex-vertical-stretch`} style={{ ...style, height }}>
      {getWrapperChildren(itemsSize)}
    </div>
  );
};
