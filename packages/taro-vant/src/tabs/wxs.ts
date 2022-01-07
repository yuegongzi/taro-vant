import { computedStyle,addUnit } from '../utils'

function tabClass(active: any, ellipsis: any,tabClass?: string,tabActiveClass?: string) {
  const classes = [ tabClass ]

  if (active) {
    classes.push(tabActiveClass)
  }

  if (ellipsis) {
    classes.push('van-ellipsis')
  }

  return classes.join(' ')
}

function tabStyle(data: any) {
  const titleColor = data.active
    ? data.titleActiveColor
    : data.titleInactiveColor

  const ellipsis = data.scrollable && data.ellipsis

  // card theme color
  if (data.type === 'card') {
    return computedStyle({
      'border-color': data.color,
      'background-color': !data.disabled && data.active ? data.color : null,
      color: titleColor || (!data.disabled && !data.active ? data.color : null),
      'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null,
    })
  }

  return computedStyle({
    color: titleColor,
    'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null,
  })
}

function navStyle(color: any, type: any) {
  return computedStyle({
    'border-color': type === 'card' && color ? color : null,
  })
}

function trackStyle(data: any) {
  if (!data.animated) {
    return ''
  }

  return computedStyle({
    // left: -100 * data.currentIndex + '%',
    transform: `translate3d(${-100 * data.currentIndex}%, 0px, 0px)`,
    '-webkit-transform': `translate3d(${-100 * data.currentIndex}%, 0px, 0px)`,
    'transition-duration': data.duration + 's',
    '-webkit-transition-duration': data.duration + 's',
    transition: data.duration + 's',
  })
}

function lineStyle(data: any) {
  return computedStyle({
    visibility: data.lineOffsetLeft === 0 ? 'hidden' : 'visible',
    width: addUnit(data.lineWidth*2),
    transform: 'translateX(' + data.lineOffsetLeft + 'px)',
    '-webkit-transform': 'translateX(' + data.lineOffsetLeft + 'px)',
    'background-color': data.color,
    height: data.lineHeight !== -1 ? addUnit(data.lineHeight) : null,
    'border-radius':
      data.lineHeight !== -1 ? addUnit(data.lineHeight) : null,
    'transition-duration': !data.skipTransition ? data.duration + 's' : null,
    '-webkit-transition-duration': !data.skipTransition
      ? data.duration + 's'
      : null,
  })
}

export { tabClass, tabStyle, trackStyle, lineStyle, navStyle }
