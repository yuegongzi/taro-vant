import type { FC } from 'react';
import type { SkuPropProps } from './PropsType';
import { createNamespace, noop } from '../utils';
import classNames from 'clsx';
import { Text, View } from '@tarojs/components'

const [ bem ] = createNamespace('sku-row');

const SkuProp: FC<SkuPropProps> = (props) => {
  const { skuValue = {}, skuKeyStr = '', selectedProp = {}, multiple, onSelect = noop } = props;
  let choosed = false;
  if (selectedProp && selectedProp[skuKeyStr]) {
    choosed = selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
  }
  const cls = classNames(bem('item', { active: choosed }));
  const onTap = () => {
    onSelect({
      ...skuValue, skuKeyStr, multiple,
    });
  };
  return (<View
      className={cls}
      onClick={onTap}
    >
      <Text className={classNames(bem('item-name'))}>{skuValue.name}</Text>
    </View>
  );
};

SkuProp.defaultProps = {};

export default SkuProp;
