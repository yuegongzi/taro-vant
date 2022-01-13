import type { ITouchEvent } from '@tarojs/components'
import { Button, View } from '@tarojs/components'
import type { FC } from 'react'
import { useCallback } from 'react'
import { createNamespace, ZIndex } from '../utils'
import type { ActionSheetItem, ActionSheetProps } from './PropsType'
import Loading from '../loading'
import Popup from '../popup'
import Icon from '../icon'
import clsx from 'clsx'

const [ bem ] = createNamespace('action-sheet')

const ActionSheet: FC<ActionSheetProps> = (props: ActionSheetProps) => {
  const {
    round,
    zIndex,
    overlay,
    closeOnClickOverlay,
    closeOnClickAction,
    safeAreaInsetBottom,
    visible,
    title,
    description,
    actions,
    cancelText,
    children,
    onSelect,
    onCancel,
    onClose,
    onClickOverlay,
    className,
    ...others
  } = props

  const _onCancel = useCallback(() => {
    onCancel?.()
  }, [ onCancel ])

  const _onClose = useCallback(() => {
    onClose?.()
  }, [ onClose ])

  const _onSelect = useCallback(
    (event: ITouchEvent) => {
      const { index } = event.currentTarget.dataset
      // const { actions, closeOnClickAction, canIUseGetUserProfile } = data
      const item = actions?.[index]
      if (item) {
        Object.defineProperty(event, 'detail', {
          value: item,
        })
        onSelect?.(event)
        if (closeOnClickAction) {
          _onClose()
        }
      }
    },
    [ _onClose, actions, closeOnClickAction, onSelect ],
  )

  const _onClickOverlay = useCallback(() => {
    onClickOverlay?.()
    onClose?.()
  }, [ onClickOverlay, onClose ])

  return (
    <Popup
      visible={visible}
      position='bottom'
      round={round}
      zIndex={zIndex}
      overlay={overlay}
      className={clsx(bem(), className)}
      safeAreaInsetBottom={safeAreaInsetBottom}
      closeOnClickOverlay={closeOnClickOverlay}
      onClose={_onClickOverlay}
      {...others}
    >
      <>
        {title && (
          <View className={clsx(bem('header'))}>
            {title}
            <Icon
              name='cross'
              className={clsx(bem('close'))}
              onClick={_onClose}
            />
          </View>
        )}

        {description && (
          <View className={clsx(bem('description'), 'van-hairline--bottom')}>
            {description}
          </View>
        )}
        {actions && actions.length && (
          <View>
            {actions.map((item: ActionSheetItem, index: number) => {
              const {
                name,
                subname,
                disabled,
                loading,
                openType,
                color,
                className: actionClassName,
                ...rest
              } = item
              return (
                <Button
                  key={index}
                  openType={disabled || loading ? '' : openType}
                  style={color ? 'color: ' + color : ''}
                  className={clsx(
                    bem('item', {
                      disabled: disabled || loading,
                    }),
                    actionClassName,
                  )}
                  hoverClass={clsx(bem('item', [ 'hover' ], true))}
                  data-index={index}
                  onClick={disabled || loading ? () => {} : _onSelect}
                  {...rest}
                >
                  {!loading ? (
                    <>
                      {name}
                      {subname && (
                        <View className={clsx(bem('subname'))}>{subname}</View>
                      )}
                    </>
                  ) : (
                    <Loading className={clsx(bem('loading'))} size='22px' />
                  )}
                </Button>
              )
            })}
          </View>
        )}
        {children}
        {cancelText && (
          <>
            <View className={clsx(bem('gap'))} />
            <View
              className={clsx(bem('cancel'))}
              hoverClass={clsx(bem('cancel', [ 'hover' ], true))}
              // hoverStayTime="70"
              onClick={_onCancel}
            >
              {cancelText}
            </View>
          </>
        )}
      </>
    </Popup>
  )
}

ActionSheet.defaultProps = {
  round: true,
  zIndex: ZIndex.ActionSheet,
  overlay: true,
  closeOnClickOverlay: true,
  closeOnClickAction: true,
  safeAreaInsetBottom: true,
}
ActionSheet.displayName = 'ActionSheet'
export default ActionSheet
