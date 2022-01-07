import type { FC } from 'react';
import type { SkuHeaderProps } from './PropsType';
import { createNamespace,fenToYuan } from '../utils';
import classNames from 'clsx';
import Image from '../image';
import { getSkuImgValue } from './utils/helper';
import { View,Text } from '@tarojs/components'

const [ bem ] = createNamespace('sku-header');

const SkuHeader: FC<SkuHeaderProps> = (props) => {
  const {
    selectedSku, sku, goods, selectedSkuComb,
    hideStock, stockThreshold = 50, stockNum, selectedTip,
  } = props;
  const { tree = [] } = sku;
  const { imgUrl, price } = goods;
  // @ts-ignore
  const image = getSkuImgValue(tree, selectedSku)?.imgUrl || imgUrl;//处理图片
  let price_num = fenToYuan(price);
  if (selectedSkuComb) {
    price_num = fenToYuan(selectedSkuComb.price + selectedSkuComb.propertyPrice);
  }
  console.log(image)
  const highlight = stockThreshold > 0 && stockThreshold >= stockNum;
  return (
    <View className={classNames('van-hairline--bottom', bem())}>
      <View className={classNames(bem('img-wrap'))}>
        <Image width={192} height={192} fit='cover' src={image}/>
      </View>
      <View className={classNames(bem('goods-info'))}>
        <View className={classNames(bem('goods-price'))}>
          <Text className={classNames(bem('price-symbol'))}>¥</Text>
          <Text className={classNames(bem('price-num'))}>{price_num}</Text>
        </View>
        <View className={classNames(bem('item', { hide: hideStock }))}>
              <Text className={classNames(bem('stock'))}>剩余
                <Text className={classNames(bem('stock-num', { highlight }))}>
                  {stockNum}
                </Text>件
              </Text>
        </View>
        <View className={classNames(bem('item'))}>{selectedTip}</View>
      </View>
    </View>
  );
};

SkuHeader.defaultProps = {};

export default SkuHeader;
