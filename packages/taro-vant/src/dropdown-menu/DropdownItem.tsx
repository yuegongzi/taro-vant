import './style/index.less'
import { Block, View } from '@tarojs/components'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import Taro from '@tarojs/taro'
import type { DropdownItemProps, IDropdownItemInstance } from './PropsType'
import Icon from '../icon'
import Cell from '../cell'
import Popup from '../popup'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('dropdown-item')

function Index(
  props: DropdownItemProps & {
    setChildrenInstance?: any
    index?: number
    parentInstance?: any
    currentIndex?: number
  },
  ref: React.Ref<IDropdownItemInstance>,
) {
  const {
    title,
    titleClass,
    value,
    popupStyle,
    disabled = false,
    setChildrenInstance,
    parentInstance,
    index,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    onChange = () => {
    },
    options = [],
    className = '',
    style,
    ...others
  } = props

  const [ wrapperStyle, setWrapperStyle ] = useState<any>({})
  const [ transition, setTransition ] = useState(true)
  const [ showPopup, setShowPopup ] = useState(false)
  const [ showWrapper, setShowWrapper ] = useState(true)
  const [ displayTitle, setDisplayTitle ] = useState('')
  const [ value_, setValue ] = useState<number | string | undefined>('')

  useEffect(() => {
    setValue(value)
  }, [ value ])

  const rerender = useCallback(() => {
    Taro.nextTick(() => {
      if (parentInstance) {
        parentInstance.updateItemListData()
      }
    })
  }, [ parentInstance ])

  const toggle = useCallback(function(show?: any, options = {}) {
      if (typeof show !== 'boolean') {
        show = !showPopup
      }
      if (show === showPopup) {
        return
      }

      setTransition(!options.immediate)
      setShowPopup(show)
      if (show) {
        if (!parentInstance) {
          void 0
        } else {
          parentInstance.getChildWrapperStyle().then((wrapperStyle: any) => {
            const rect = wrapperStyle.rect
            delete wrapperStyle.rect
            if (wrapperStyle) {
              wrapperStyle.width = '100vw'
              wrapperStyle.position = 'absolute'
            }

            if (parentInstance.direction === 'down') {
              wrapperStyle.top = rect.height + 'PX'
              wrapperStyle.height = '100vh'
              setWrapperStyle(wrapperStyle)
              setShowWrapper(true)
              rerender()
            }

            if (parentInstance.direction === 'up') {
              wrapperStyle.height = '100vh'
              wrapperStyle.top = 0
              wrapperStyle.transform = 'translateY(-100%)'
              wrapperStyle.WebkitTransform = 'translateY(-100%)'
              wrapperStyle.MozTransform = 'translateY(-100%)'
              wrapperStyle.OTransform = 'translateY(-100%)'
              setWrapperStyle(wrapperStyle)
              setShowWrapper(true)
              rerender()
            }
          })
        }
      } else {
        rerender()
      }
    },
    [ showPopup, parentInstance, rerender ],
  )

  useEffect(
    function() {
      setChildrenInstance(index, {
        title,
        titleClass,
        disabled,
        transition,
        showPopup,
        index,
        setDisplayTitle,
        displayTitle,
        options,
        value: value_,
        toggle,
      })
    },
    [
      title,
      titleClass,
      index,
      setChildrenInstance,
      disabled,
      transition,
      showPopup,
      setDisplayTitle,
      displayTitle,
      options,
      value_,
      toggle,
    ],
  )

  const onClosed_ = useCallback(
    function() {
      if (onClosed) onClosed()
      setShowWrapper(false)
    },
    [ onClosed ],
  )

  const onOptionTap = function(_event: any, option: any) {
    const shouldEmitChange = value_ !== option.value
    setShowPopup(false)
    setValue(option.value)
    if (onClose) onClose()
    rerender()
    if (shouldEmitChange) {
      onChange(option.value)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggle,
    }
  })

  return showWrapper ? (
    <View
      className={clsx(bem([ parentInstance.direction ]), className)}
      style={computedStyle([ wrapperStyle, style ])}
    >
      <Popup
        show={showPopup}
        style={computedStyle([ { position: 'absolute' }, popupStyle ])}
        overlayStyle='position: absolute;'
        overlay={!!parentInstance.overlay}
        position={parentInstance.direction === 'down' ? 'top' : 'bottom'}
        duration={transition ? parentInstance.duration : 0}
        closeOnClickOverlay={parentInstance.closeOnClickOverlay}
        onEnter={onOpen}
        onLeave={onClose}
        onClose={toggle}
        onAfterEnter={onOpened}
        onAfterLeave={onClosed_}
      >
        <View>
          {(options || []).map((item: any, index: number) => (
            <Cell
              key={`${index}VanCell`}
              data-option={item}
              className={clsx(bem('option', {
                active: item.value === value_,
              }))}
              clickable
              icon={item.icon}
              onClick={(e) => onOptionTap(e, item)}
              title={
                <Block>
                  <View
                    className={clsx(bem('title'))}
                    style={
                      item.value === value_
                        ? 'color:' + parentInstance.activeColor
                        : ''
                    }
                  >
                    {item.text}
                  </View>
                </Block>
              }
            >
              {item.value === value_ && (
                <Icon
                  name='success'
                  className={clsx(bem('icon'))}
                  color={parentInstance.activeColor}
                />
              )}
            </Cell>
          ))}
          {others.children}
        </View>
      </Popup>
    </View>
  ) : (
    <></>
  )
}

const DropdownItem = memo(forwardRef(Index))
DropdownItem.displayName = 'DropdownItem'
export default DropdownItem
