import { Button, View } from '@tarojs/components'
import { useCallback } from 'react'
import Options from './options'
import Popup from '../popup'
import type { ShareSheetOptionItem, ShareSheetProps } from './PropsType'
import { createNamespace, ZIndex } from '../utils'
import clsx from 'clsx'
import { isMulti } from './wxs'

const [ bem ] = createNamespace('share-sheet')

function ShareSheet(props: ShareSheetProps) {
  const {
    visible,
    duration = 300,
    closeOnClickOverlay = true,
    safeAreaInsetBottom = true,
    overlay = true,
    zIndex = ZIndex.ShareSheet,
    overlayStyle,
    title,
    cancelText = '取消',
    description,
    options = [],
    onClickOverlay,
    onSelect,
    onClose,
    onCancel,
    ...others
  } = props

  const _onClickOverlay = useCallback(() => {
    onClickOverlay?.()
  }, [ onClickOverlay ])

  const _onSelect = useCallback(
    (option) => {
      onSelect?.({ detail: option })
    },
    [ onSelect ],
  )

  const _onClose = useCallback(() => {
    onClose?.()
  }, [ onClose ])

  const _onCancel = useCallback(() => {
    onClose?.()
    onCancel?.()
  }, [ onCancel, onClose ])

  return (
    <Popup
      round
      className={clsx(bem())}
      visible={visible}
      position='bottom'
      overlay={overlay}
      duration={duration}
      zIndex={zIndex}
      overlayStyle={overlayStyle}
      closeOnClickOverlay={closeOnClickOverlay}
      safeAreaInsetBottom={safeAreaInsetBottom}
      onClose={_onClose}
      onClickOverlay={_onClickOverlay}
      {...others}
    >
      <View className={clsx(bem('header'))}>
        <View className={clsx(bem('title'))}>{title}</View>
        <View className={clsx(bem('description'))}>{description}</View>
      </View>
      {isMulti(options) ? (
        <>
          {(options as ShareSheetOptionItem[][]).map(
            (item: ShareSheetOptionItem[], index: number) => {
              return (
                <Options
                  showBorder={index !== 0}
                  key={index}
                  options={item}
                  onSelect={_onSelect}
                />
              )
            },
          )}
        </>
      ) : (
        <Options
          options={options as ShareSheetOptionItem[]}
          onSelect={_onSelect}
        />
      )}
      <Button className={clsx(bem('cancel'))} onClick={_onCancel}>
        {cancelText}
      </Button>
    </Popup>
  )
}
ShareSheet.diplayName = 'ShareSheet'
export default ShareSheet
