import './style/index.less';
import type { ITouchEvent } from '@tarojs/components'
import { Button, View } from '@tarojs/components'
import type { FC } from 'react'
import { useCallback } from 'react'
import { createNamespace } from '../wxs'
import type { ActionSheetItem, ActionSheetProps } from './PropsType'
import VanLoading from '../loading'
import VanPopup from '../popup'
import VanIcon from '../icon'
import './style/index.less'
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
    show,
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
    <VanPopup
      show={show}
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
            <VanIcon
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
                  className={clsx(bem('item', {
                    disabled: disabled || loading,
                  }), actionClassName)
                  }
                  hoverClass={clsx(bem('item', [ 'hover' ]))}
                  data-index={index}
                  onClick={disabled || loading ? () => {
                  } : _onSelect}
                  {...rest}
                >
                  {!loading ? (
                    <>
                      {name}
                      {subname && (
                        <View className={clsx(bem('subname'))}>
                          {subname}
                        </View>
                      )}
                    </>
                  ) : (
                    <VanLoading
                      className={clsx(bem('loading'))}
                      size='22px'
                    />
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
    </VanPopup>
  )
}

ActionSheet.defaultProps = {
  round: true,
  zIndex: 100,
  overlay: true,
  closeOnClickOverlay: true,
  closeOnClickAction: true,
  safeAreaInsetBottom: true,
}

export default ActionSheet
