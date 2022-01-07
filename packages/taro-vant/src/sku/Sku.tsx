import type { FC } from 'react';
import  { useState } from 'react';
import Popup from '../popup'
import Taro from '@tarojs/taro'
import SkuHeader from './SkuHeader';
import SkuBody from './SkuBody';
import SkuRow from './SkuRow';
import SkuItem from './SkuItem';
import SkuStepper from './SkuStepper';
import PropItem from './SkuProp';
import {
  getSelectedProperties,
  getSelectedPropValues,
  getSelectedSkuValues,
  getSkuComb,
  isAllSelected,
} from './utils/helper';
import type { SkuAction, SkuProps, SpuProp, SpuSpec } from './PropsType';
import { createNamespace, noop } from '../utils';
import './style/index.less';
import SkuActions from './SkuActions';
import classNames from 'clsx';

const [ bem ] = createNamespace('sku');

const CART: SkuAction = { text: '立即购买', show: true };
const BUY: SkuAction = { text: '加入购物车', show: true };

const Sku: FC<SkuProps> = (props) => {
  const {
    visible = false, sku, goods, stockThreshold,
    cart = CART, buy = BUY, hideStock = false, limit = 1, quota = 0,
    onSubmit = noop, onCancel = noop, properties = [],
  } = props;
  const { tree = [], list = [] } = sku;
  const { stock } = goods;//默认商品信息
  const [ count, setCount ] = useState<any>(limit);
  const [ selectedSku, setSelectedSku ] = useState<any>({});
  const [ selectedProp, setSelectedProp ] = useState<any>({});

  const isSkuCombSelected = isAllSelected(tree, selectedSku); //全选
  const selectedSkuValues = getSelectedSkuValues(tree, selectedSku); //规格选择值
  const selectedPropValues = getSelectedPropValues(properties, selectedProp); //属性选择值

  let selectedSkuComb: any = null;
  if (isSkuCombSelected) {
    selectedSkuComb = getSkuComb(list, selectedSku);
    if (selectedSkuComb) {
      selectedSkuComb.properties = getSelectedProperties(
        properties, selectedProp,
      );
      selectedSkuComb.propertyPrice = selectedPropValues.reduce(
        (acc, cur: { price: number }) => acc + (cur.price || 0),
        0,
      );
    }
  }
  const stockNum = selectedSkuComb?.stock || stock;
  const selectedCountFn = () => {
    if (selectedSkuComb) {
      return stockNum < count ? stockNum : count;
    }
    return count;
  };

  const selectedCheckFn = () => {
    if (selectedSkuComb) {
      const spec = selectedSkuValues.map((item: SpuSpec) => item.name).join(' ');
      const prop = selectedPropValues.map((item: SpuSpec) => item.name).join(' ');
      return `已选 ${spec} ${prop}`;
    }
    const unselectedSku = tree.filter(
      (item: SpuSpec) => selectedSku[item.id] === '' || selectedSku[item.id] == null,
    ).map((item: SpuSpec) => item.name);
    return `请选择 ${unselectedSku.join(' ')}`;
  };
  const selectedCount = selectedCountFn();
  const selectedTip = selectedCheckFn();
  const onSelect = (e: { name: string, skuKeyStr: string }) => {
    const { name, skuKeyStr } = e;
    const s = {
      ...selectedSku,
      [skuKeyStr]: selectedSku[skuKeyStr] === name ? '' : name,
    };
    setSelectedSku(s);
  };
  const onPropSelect = (propValue: SpuProp) => {
    const { id, skuKeyStr, multiple } = propValue;
    const arr = selectedProp[skuKeyStr] || [];
    const pos = arr.indexOf(id);
    if (pos > -1) {
      arr.splice(pos, 1);
    } else if (multiple) {
      arr.push(id);
    } else {
      arr.splice(0, 1, id);
    }
    const s = {
      ...selectedProp,
      [skuKeyStr]: arr,
    };
    setSelectedProp(s);
  };

  const onBuyOrAddCart = (type: string) => {
    if (!isSkuCombSelected) {
      Taro.showToast({
        title: selectedTip,
        icon:'none'
      });
      return;
    }
    onSubmit(type, {
      ...selectedSkuComb, count: selectedCount,
    });
  };

  const onBuy = () => {
    onBuyOrAddCart('buy');
  };
  const onAddCart = () => {
    onBuyOrAddCart('addCart');
  };

  return (<Popup position='bottom' round closeable
                 className={classNames(bem('container'))}
                 show={visible}
                 onClose={onCancel}>

      <SkuHeader
        selectedSku={selectedSku}
        sku={sku}
        goods={goods}
        selectedSkuComb={selectedSkuComb}
        hideStock={hideStock}
        stockThreshold={stockThreshold}
        stockNum={stockNum}
        selectedTip={selectedTip}
      />
      <SkuBody>
        {tree.map((item: SpuSpec, index: number) => (
          <SkuRow key={index} name={item.name}>
            {item.values.map((skuValue, key) => (
              <SkuItem
                key={key}
                skuValue={skuValue}
                skuKeyStr={item.id + ''}
                skuList={list}
                selectedSku={selectedSku}
                onSelect={onSelect}
              />
            ))}
          </SkuRow>
        ))}
        {properties.map((item, index) => (
          <SkuRow key={index} name={item.name} multiple={item.multiple}>
            {item.values.map((skuProp, key) => (
              <PropItem
                key={key}
                skuValue={skuProp}
                skuKeyStr={item.id + ''}
                multiple={item.multiple}
                selectedProp={selectedProp}
                onSelect={onPropSelect}
              />
            ))}
          </SkuRow>
        ))}
        <SkuStepper limit={limit}
                    value={count}
                    quota={quota}
                    onChange={setCount}
                    stockNum={stockNum}/>
        {props.children}
      </SkuBody>
      <SkuActions buy={{ ...cart, onClick: onBuy }}
                  cart={{ ...buy, onClick: onAddCart }}/>
    </Popup>
  );
};

Sku.defaultProps = {};
Sku.displayName = 'Sku'
export default Sku;
