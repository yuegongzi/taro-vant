import { Button, Image, View } from '@tarojs/components'
import type { ShareSheetOption } from './PropsType'
import { createNamespace } from '../utils'
import clsx from 'clsx'
import { getIconURL } from './wxs'

const [ bem ] = createNamespace('share-sheet')

export default function Index(props: ShareSheetOption) {
  const { showBorder, onSelect, options } = props

  return (
    <View className={clsx(bem('options', { border: showBorder }))}>
      {options.map((item, index) => (
        <View
          key={index}
          className={clsx(bem('option'))}
          onClick={() => onSelect?.(item, index)}
        >
          <Button className={clsx(bem('button'))}
                  open-type={item.openType || ''}
          >
            <Image
              src={getIconURL(item.icon)}
              className={clsx(bem('icon'))}
            />
          </Button>
          {item.name && (
            <View className={clsx(bem('name'))}>{item.name}</View>
          )}
          {item.description && (
            <View className={clsx(bem('option-description'))}>
              {item.description}
            </View>
          )}
        </View>
      ))}
    </View>
  )
}
