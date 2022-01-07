import type { FC } from 'react';
import type { SkuBodyProps } from './PropsType';
import { createNamespace } from '../utils';
import classNames from 'clsx';
import { ScrollView } from '@tarojs/components'

const [ bem ] = createNamespace('sku-body');

const SkuBody: FC<SkuBodyProps> = (props) => {
  const { className } = props;
  return (
    <ScrollView className={classNames(className, bem())}>
      {props.children}
    </ScrollView>
  );
};

SkuBody.defaultProps = {};

export default SkuBody;
