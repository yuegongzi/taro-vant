import './style/index.less'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Image as TaroImage, View } from '@tarojs/components'
import type { ImageProps } from './PropsType'
import Icon from '../icon/index'
import type { FitType } from './wxs'
import { mode, rootStyle } from './wxs'
import { computedStyle, createNamespace } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('image')

type TaroImageMode =
  | 'center'
  | 'scaleToFill'
  | 'aspectFill'
  | 'aspectFit'
  | 'widthFix'
  | 'heightFix'

function Image(props: ImageProps) {
  const {
    src,
    round,
    width,
    height,
    radius,
    lazyLoad,
    showMenuByLongpress,
    fit,
    showError = true,
    showLoading = true,
    className,
    style,
    renderError,
    renderLoading,
    ...others
  } = props

  const [ loading, setLoading ] = useState<boolean>()
  const [ error, setError ] = useState(false)

  useEffect(
    function() {
      if (loading === undefined) setLoading(true)
      setError(false)
    },
    [ loading ],
  )

  const onLoad = useCallback(function() {
    setLoading(false)
  }, [])

  const onError = useCallback(function() {
    setError(true)
  }, [])
  //样式挂在给img外层的webCompoent
  const styleH5 = useMemo(
    function() {
      let style = {}
      if (process.env.TARO_ENV === 'h5') {
        if (fit === 'heightFix' || fit === 'widthFix') {
          style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
      }
      return style
    },
    [ fit ],
  )

  return (
    <View
      style={computedStyle([
        rootStyle({
          width,
          height,
          radius,
        }),
        style,
      ])}
      className={clsx(bem({ round }), className)}
      onClick={others.onClick}
      {...others}
    >
      {!error && (
        <TaroImage
          src={src}
          mode={mode(fit || ('none' as FitType)) as TaroImageMode}
          lazyLoad={lazyLoad}
          className={clsx(bem('img'))}
          showMenuByLongpress={showMenuByLongpress}
          onLoad={onLoad}
          onError={onError}
          style={styleH5}
        />
      )}
      {loading && showLoading && (
        <View className={clsx(bem('loading'))}>
          {renderLoading || (
            <Icon name='photo' className={clsx(bem('loading-icon'))} />
          )}
        </View>
      )}
      {error && showError && (
        <View className={clsx(bem('error'))}>
          {renderError || (
            <Icon
              name='photo-fail'
              className={clsx(bem('error-icon'))}
            />
          )}
        </View>
      )}
    </View>
  )
}

export default Image
