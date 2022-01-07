import type { FC } from 'react';
import type { SkuActionProps } from './PropsType';
import { createNamespace } from '../utils';
import classNames from 'clsx';
import GoodsAction from '../goods-action'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('sku-actions');

const SkuActions: FC<SkuActionProps> = (props) => {
  const { cart, buy } = props;

  return (
    <View className={classNames(bem())}>
      <GoodsAction>
        {cart.show &&
        <GoodsAction.Button
          type='warning'
          color={cart.color || ''}
          onClick={cart.onClick}
        >
          {cart.text}
        </GoodsAction.Button>
        }
        {
          buy.show &&
          <GoodsAction.Button
            type='danger'
            color={buy.color}
            onClick={buy.onClick}
          >
            {buy.text}
          </GoodsAction.Button>
        }
      </GoodsAction>
    </View>
  );
};

SkuActions.defaultProps = {};

export default SkuActions;
