import type { FC } from 'react';
import type { SkuRowProps } from './PropsType';
import { createNamespace } from '../utils';
import classNames from 'clsx';
import { View,Text } from '@tarojs/components'

const [ bem ] = createNamespace('sku-row');

const SkuRow: FC<SkuRowProps> = (props) => {
  const { name, multiple } = props;
  return (
    <View className={classNames(bem())}>
      <View className={classNames(bem('title'))}>{name}
        {multiple &&
        <Text className={classNames(bem('title-multiple'))}>
                      （可多选）
                    </Text>
        }
      </View>
      {props.children}
    </View>
  );
};

SkuRow.defaultProps = {};

export default SkuRow;
