import type { FC } from 'react';
import type { SkuStepperProps } from './PropsType';
import { createNamespace, noop } from '../utils'
import classNames from 'clsx';
import Stepper from '../stepper';
import { View,Text } from '@tarojs/components'

const [ bem ] = createNamespace('sku');

const SkuStepper: FC<SkuStepperProps> = (props) => {
  const { limit, stockNum, quota, onChange = noop, value } = props;
  let max = stockNum;
  if (quota > 0) {
    max = max > quota ? quota : max;
  }
  const title = () => {
    if (quota > 0 && limit > 1) {
      return `（${limit}件起售，限购${quota}件）`;
    }
    if (quota > 0) {
      return `（限购${quota}件）`;
    }
    if (limit > 1) {
      return `（${limit}件起售）`;
    }
    return null;
  };

  return (
    <View className={classNames(bem('stepper-stock'))}>
      <View className={classNames(bem('stepper-title'))}>购买数量</View>
      <View className={classNames(bem('stepper'))}>
        <Stepper value={value} min={limit} max={max} onChange={(e)=>{
          onChange(e.detail.value)
        }}/>
      </View>
      <Text className={classNames(bem('stepper-quota'))}>
            {title()}
      </Text>
    </View>
  );
};

SkuStepper.defaultProps = {};

export default SkuStepper;
