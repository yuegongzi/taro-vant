// 判断sku是否可选
export function isSkuChoosable(skuList: any, selectedSku: any, skuToChoose: any) {
  const { key, valueId } = skuToChoose;

  // 先假设sku已选中，拼入已选中sku对象中
  const matchedSku = {
    ...selectedSku,
    [key]: valueId,
  };

  // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中
  const skusToCheck = Object.keys(matchedSku).filter(
    (skuKey) => matchedSku[skuKey] !== '',
  );

  const filteredSku = skuList.filter((sku: any[]) =>
    skusToCheck.every(
      (skuKey: any) => String(matchedSku[skuKey]) === String(sku[skuKey]),
    ),
  );

  const stock = filteredSku.reduce((total: unknown, sku: unknown) => {
    // @ts-ignore
    total += sku.stock;
    return total;
  }, 0);

  return stock > 0;
}

// 判断是否所有的sku都已经选中
export function isAllSelected(skuTree: any[], selectedSku: Record<any, any>) {
  // 筛选selectedSku对象中key值不为空的值
  const selected = Object.keys(selectedSku).filter(
    (skuKeyStr) => selectedSku[skuKeyStr] !== '',
  );
  return skuTree.length === selected.length;
}

// 根据已选择的 sku 获取 skuComb
export function getSkuComb(skuList: any[], selectedSku: Record<any, any>) {
  const skuComb = skuList.filter((item) =>
    Object.keys(selectedSku).every(
      (skuKeyStr) => String(item[skuKeyStr]) === String(selectedSku[skuKeyStr]),
    ),
  );
  return skuComb[0];
}

export function normalizeSkuTree(skuTree: any[]) {
  const normalizedTree = {};
  skuTree.forEach((treeItem) => {
    // @ts-ignore
    normalizedTree[treeItem.id] = treeItem.values;
  });
  return normalizedTree;
}

// 获取已选择的sku名称
export function getSelectedSkuValues(skuTree: any[], selectedSku: Record<any, any>) {
  const normalizedTree = normalizeSkuTree(skuTree);
  return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
    // @ts-ignore
    const skuValues = normalizedTree[skuKeyStr];
    const skuValueId = selectedSku[skuKeyStr];

    if (skuValueId !== '') {
      const skuValue = skuValues.filter((value: any) => value.name === skuValueId)[0];
      if (skuValue) {
        // @ts-ignore
        selectedValues.push(skuValue);
      }
      // skuValue && selectedValues.push(skuValue)
    }
    return selectedValues;
  }, []);
}

export function getSkuImgValue(tree: any, selectedSku: any) {
  let imgValue;
  tree.some((item: any) => {
    const id = selectedSku[item.id];
    if (id && item.values) {
      const matchedSku = item.values.filter((skuValue: { name: any; }) => skuValue.name == id)[0] || {};
      const img = matchedSku.previewImgUrl || matchedSku.imgUrl;
      if (img) {
        imgValue = {
          ...matchedSku,
          id: item.id,
        };
        return true;
      }
    }

    return false;
  });
  return imgValue;
}

export const normalizePropList = (propList: any[]) => {
  const normalizedProp = {};
  propList.forEach((item) => {
    const itemObj = {};
    item.values.forEach((it: any) => {
      // @ts-ignore
      itemObj[it.id] = it;
    });
    // @ts-ignore
    normalizedProp[item.id] = itemObj;
  });
  return normalizedProp;
};

export const getSelectedPropValues = (propList: any[], selectedProp: Record<any, any>) => {
  const normalizeProp = normalizePropList(propList);
  return Object.keys(selectedProp).reduce((acc, cur) => {
    selectedProp[cur].forEach((it: any) => {
      // @ts-ignore
      acc.push({ ...normalizeProp[cur][it], });
    });
    return acc;
  }, []);
};

export const getSelectedProperties = (propList: any[], selectedProp: Record<any, any>) => {
  const list: any[] = [];
  (propList || []).forEach((prop) => {
    if (selectedProp[prop.id] && selectedProp[prop.id].length > 0) {
      const v: any[] = [];
      prop.values.forEach((it: any) => {
        if (selectedProp[prop.id].indexOf(it.id) > -1) {
          v.push({ ...it });
        }
      });
      list.push({
        ...prop,
        v,
      });
    }
  });
  return list;
};
