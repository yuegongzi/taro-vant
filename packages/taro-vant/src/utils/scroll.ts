import { isObject } from './type'

type ScrollElement = Element | Window
type FieldAutosizeConfig = {
  maxHeight?: number
  minHeight?: number
}

export function getRootScrollTop(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

export function setScrollTop(el: ScrollElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value
  } else {
    el.scrollTo(el.scrollX, value)
  }
}

export function resizeTextarea(
  input: HTMLTextAreaElement,
  autosize: true | FieldAutosizeConfig,
) {
  const scrollTop = getRootScrollTop()
  input.style.height = 'auto'
  input.style.lineHeight = 'inherit'
  input.rows = 1

  let height = input.scrollHeight
  if (isObject(autosize)) {
    const { maxHeight, minHeight }: any = autosize
    if (maxHeight !== undefined) {
      height = Math.min(height, maxHeight)
    }
    if (minHeight !== undefined) {
      height = Math.max(height, minHeight)
    }
  }

  if (height) {
    input.style.height = `${height}px`
    // https://github.com/youzan/vant/issues/9178
    setRootScrollTop(scrollTop)
  }
}
