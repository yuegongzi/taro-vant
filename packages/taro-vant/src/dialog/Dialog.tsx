import { Block, Text, View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import {
  addUnit,
  computedStyle,
  createNamespace,
  GRAY,
  RED,
  toPromise,
} from '../utils'
import GoodsAction, { GoodsActionButton } from '../goods-action'
import Button from '../button'
import Popup from '../popup'
import type { DialogProps } from './PropsType'
import { off, on, trigger } from './events'
import dialog from './dialog-func'
import clsx from 'clsx'

const [ bem ] = createNamespace('dialog')

function Dialog(props: DialogProps) {
  const [ options, setOptions ] = useState<DialogProps>({})

  const {
    show: _show,
    overlay = true,
    transition = 'scale',
    theme = 'default',
    zIndex = 2000,
    width,
    overlayStyle,
    closeOnClickOverlay,
    message,
    title,
    messageAlign,
    showCancelButton,
    cancelButtonColor = GRAY,
    confirmButtonColor = RED,
    cancelButtonText = '取消',
    showConfirmButton = true,
    confirmButtonOpenType,
    sessionFrom,
    sendMessageTitle,
    sendMessagePath,
    sendMessageImg,
    showMessageCard,
    appParameter,
    confirmButtonText = '确认',
    renderTitle,
    onClose,
    onConfirm,
    onCancel,
    beforeClose,
    asyncClose,
    children,
    style,
    className,
    ...others
  } = options

  const [ confirmLoading, setConfirmLoading ] = useState(false)
  const [ cancelLoading, setCancelLoading ] = useState(false)
  const [ show, setShow ] = useState(_show)

  const _close = useCallback(
    (action: 'confirm' | 'cancel' | 'overlay' | 'close') => {
      setShow(false)

      Taro.nextTick(() => {
        onClose?.({ detail: action })
      })
    },
    [ onClose ],
  )
  const _onClickOverlay = useCallback(() => {
    _close('overlay')
  }, [ _close ])

  const _stopLoading = useCallback(() => {
    setConfirmLoading(false)
    setCancelLoading(false)
  }, [])

  const _handleAction = useCallback(
    (action) => {
      if (action === 'confirm') {
        onConfirm?.({ detail: { action, dialog: { dialog: null } } })
        // 触发promise
        trigger('confirm')
      } else if (action === 'cancel') {
        onCancel?.({ detail: { action, dialog: { dialog: null } } })
        trigger('cancel')
      } else {
        trigger('cancel')
      }
      if (!asyncClose && !beforeClose) {
        _close(action)
        return
      }
      if (action === 'confirm') {
        setConfirmLoading(true)
      } else {
        setCancelLoading(true)
      }

      if (beforeClose) {
        toPromise(beforeClose(action)).
          then((value: boolean) => {
            if (value) {
              _close(action)
              _stopLoading()
            } else {
              _stopLoading()
            }
          }).
          catch(() => {
            _stopLoading()
          })
      }
    },
    [ _close, _stopLoading, asyncClose, beforeClose, onCancel, onConfirm ],
  )

  const _onConfirm = useCallback(() => {
    _handleAction('confirm')
  }, [ _handleAction ])

  const _onCancel = useCallback(() => {
    _handleAction('cancel')
  }, [ _handleAction ])

  useEffect(() => {
    setOptions({
      ...props,
    })
    if (!props.show) {
      _stopLoading()
    }
    setShow(props.show)
    // eslint-disable-next-line
  }, [props])

  useEffect(() => {
    if (!props.id) {
      return
    }

    const alertFn = (params: DialogProps = {}) => {
      if (!params?.selector || props.id === params.selector.replace(/^#/, '')) {
        setOptions({
          ...params,
        })
        setShow(!!params.show)
      }
    }
    const stopLoadingFn = () => {
      _stopLoading()
    }
    const closeFn = () => {
      _close('close')
    }

    on('alert', alertFn)
    on('close', closeFn)
    on('stopLoading', stopLoadingFn)

    return () => {
      off('alert', alertFn)
      off('close', closeFn)
      off('stopLoading', stopLoadingFn)
    }
  }, [ _close, _stopLoading, options, props.id ])

  useEffect(() => {
    return () => {
      off('confirm')
      off('cancel')
      // 设计 咏于
      off('alert')
      off('close')
      off('stopLoading')
    }
  }, [])

  return (
    <Popup
      show={show}
      zIndex={zIndex}
      overlay={overlay}
      transition={transition}
      className={clsx(bem([ theme ]), className)}
      style={computedStyle([ 'width: ' + addUnit(width) + ';', style ])}
      overlayStyle={overlayStyle}
      closeOnClickOverlay={closeOnClickOverlay}
      onClose={_onClickOverlay}
    >
      {(title || renderTitle) && (
        <View
          className={clsx(
            bem('header', {
              isolated: !(message || renderTitle),
            }),
          )}
        >
          {/* {renderTitle || } */}
          {renderTitle ? renderTitle : title && <Block>{title}</Block>}
        </View>
      )}
      {children
        ? children
        : message && (
            <View
              className={clsx(
                bem('message', [ theme, messageAlign, { hasTitle: title } ]),
              )}
            >
              <Text className={clsx(bem('message-text'))}>{message}</Text>
            </View>
          )}

      {theme === 'round-button' ? (
        <GoodsAction className={clsx(bem('footer', [ 'round-button' ]))}>
          {showCancelButton && (
            <GoodsActionButton
              loading={cancelLoading}
              className={clsx(
                bem('button'),
                bem('cancel'),
                'van-hairline--right',
              )}
              style={'color: ' + cancelButtonColor}
              onClick={_onCancel}
            >
              {cancelButtonText}
            </GoodsActionButton>
          )}
          {showConfirmButton && (
            <GoodsActionButton
              className={clsx(bem('button'), bem('confirm'))}
              style={'color: ' + confirmButtonColor}
              loading={confirmLoading}
              openType={confirmButtonOpenType}
              sessionFrom={sessionFrom}
              sendMessageTitle={sendMessageTitle}
              sendMessagePath={sendMessagePath}
              sendMessageImg={sendMessageImg}
              appParameter={appParameter}
              onClick={_onConfirm}
              {...others}
            >
              {confirmButtonText}
            </GoodsActionButton>
          )}
        </GoodsAction>
      ) : (
        <View className={clsx(bem('footer'), 'van-hairline--top')}>
          {showCancelButton && (
            <Button
              size='large'
              loading={cancelLoading}
              className={clsx(bem('button'), bem('cancel'))}
              style={'color: ' + cancelButtonColor}
              onClick={_onCancel}
            >
              {cancelButtonText}
            </Button>
          )}
          {showConfirmButton && (
            <Button
              size='large'
              className={clsx(bem('button'), bem('confirm'), {
                ['van-hairline--left']: showCancelButton,
              })}
              loading={confirmLoading}
              style={'color: ' + confirmButtonColor}
              openType={confirmButtonOpenType}
              sessionFrom={sessionFrom}
              sendMessageTitle={sendMessageTitle}
              sendMessagePath={sendMessagePath}
              sendMessageImg={sendMessageImg}
              showMessageCard={showMessageCard}
              appParameter={appParameter}
              onClick={_onConfirm}
              {...others}
            >
              {confirmButtonText}
            </Button>
          )}
        </View>
      )}
    </Popup>
  )
}

Dialog.alert = function (options: DialogProps) {
  return dialog.alert(options)
}
Dialog.confirm = function (options: DialogProps) {
  return dialog.confirm(options)
}
Dialog.close = function () {
  dialog.close()
}
Dialog.stopLoading = function () {
  dialog.stopLoading()
}
Dialog.setDefaultOptions = function (options: DialogProps) {
  dialog.setDefaultOptions(options)
}
Dialog.resetDefaultOptions = function () {
  dialog.resetDefaultOptions()
}

Dialog.displayName = 'Dialog'
export default Dialog
