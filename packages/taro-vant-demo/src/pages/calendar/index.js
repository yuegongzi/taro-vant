import { Component } from 'react'
import { Calendar, Cell } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import computed from './index.wxs.js'
import './index.scss'

export default class Index extends Component {
  state = {
    date: {
      maxRange: [],
      selectSingle: null,
      selectRange: [],
      selectMultiple: [],
      quickSelect1: null,
      quickSelect2: [],
      customColor: [],
      customConfirm: [],
      customRange: null,
      customDayText: [],
      customPosition: null,
    },
    type: 'single',
    round: true,
    color: undefined,
    minDate: Date.now(),
    maxDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 6,
      new Date().getDate(),
    ).getTime(),
    maxRange: undefined,
    position: undefined,
    formatter: undefined,
    showConfirm: false,
    showCalendar: false,
    tiledMinDate: new Date(2012, 0, 10).getTime(),
    tiledMaxDate: new Date(2012, 2, 20).getTime(),
    confirmText: undefined,
    confirmDisabledText: undefined,
    firstDayOfWeek: 0,
  }
  onConfirm = (event) => {
    console.log(event, `date.${this.state.id}`)
    this.setState({ showCalendar: false })
    this.setState({
      date: {
        ...this.state.date,
        [`${this.state.id}`]: Array.isArray(event.detail.value)
          ? event.detail.value.map((date) => date?.valueOf())
          : event.detail.value.valueOf(),
      },
    })
  }
  onSelect = (event) => {
    console.log(event)
  }
  onUnselect = (event) => {
    console.log(event)
  }
  onClose = () => {
    this.setState({ showCalendar: false })
  }
  onOpen = () => {
    console.log('open')
  }
  onOpened = () => {
    console.log('opened')
  }
  onClosed = () => {
    console.log('closed')
  }
  resetSettings = () => {
    this.setState({
      round: true,
      color: null,
      minDate: Date.now(),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 6,
        new Date().getDate(),
      ).getTime(),
      maxRange: null,
      position: 'bottom',
      formatter: null,
      showConfirm: true,
      confirmText: '??????',
      confirmDisabledText: null,
    })
  }
  show = (event) => {
    this.resetSettings()
    const { type, id } = event.currentTarget.dataset
    const data = {
      id,
      type,
      showCalendar: true,
    }
    switch (id) {
      case 'quickSelect1':
      case 'quickSelect2':
        data.showConfirm = false
        break
      case 'customColor':
        data.color = '#07c160'
        break
      case 'customConfirm':
        data.confirmText = '??????'
        data.confirmDisabledText = '?????????????????????'
        break
      case 'customRange':
        data.minDate = new Date(2010, 0, 1).getTime()
        data.maxDate = new Date(2010, 0, 31).getTime()
        break
      case 'customDayText':
        data.minDate = new Date(2010, 4, 1).getTime()
        data.maxDate = new Date(2010, 4, 31).getTime()
        data.formatter = this.dayFormatter
        break
      case 'customPosition':
        data.round = false
        data.position = 'right'
        break
      case 'maxRange':
        data.maxRange = 3
        break
    }
    this.setState(data)
  }
  dayFormatter = (day) => {
    const month = day.date.getMonth() + 1
    const date = day.date.getDate()
    if (month === 5) {
      if (date === 1) {
        day.topInfo = '?????????'
      } else if (date === 4) {
        day.topInfo = '???????????????'
      } else if (date === 11) {
        day.text = '??????'
      }
    }
    if (day.type === 'start') {
      day.bottomInfo = '??????'
    } else if (day.type === 'end') {
      day.bottomInfo = '??????'
    }
    return day
  }

  render() {
    const {
      date,
      tiledMinDate,
      tiledMaxDate,
      firstDayOfWeek,
      showCalendar,
      type,
      color,
      round,
      position,
      minDate,
      maxDate,
      maxRange,
      formatter,
      showConfirm,
      confirmText,
      confirmDisabledText,
    } = this.state
    return (
      <DemoPage title='Calendar ??????'>
        <DemoBlock title='????????????'>
          <Cell
            isLink
            title='??????????????????'
            value={computed.formatFullDate(date.selectSingle)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'single', id: 'selectSingle' },
                },
                target: {
                  dataset: { type: 'single', id: 'selectSingle' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='??????????????????'
            value={computed.formatMultiple(date.selectMultiple)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'multiple', id: 'selectMultiple' },
                },
                target: {
                  dataset: { type: 'multiple', id: 'selectMultiple' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='??????????????????'
            value={computed.formatRange(date.selectRange)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'selectRange' },
                },
                target: {
                  dataset: { type: 'range', id: 'selectRange' },
                },
              })
            }}
          />
        </DemoBlock>
        <DemoBlock title='????????????'>
          <Cell
            isLink
            title='??????????????????'
            value={computed.formatFullDate(date.quickSelect1)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'single', id: 'quickSelect1' },
                },
                target: {
                  dataset: { type: 'single', id: 'quickSelect1' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='??????????????????'
            value={computed.formatRange(date.quickSelect2)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'quickSelect2' },
                },
                target: {
                  dataset: { type: 'range', id: 'quickSelect2' },
                },
              })
            }}
          />
        </DemoBlock>
        <DemoBlock title='???????????????'>
          <Cell
            isLink
            title='???????????????'
            value={computed.formatRange(date.customColor)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'customColor' },
                },
                target: {
                  dataset: { type: 'range', id: 'customColor' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='?????????????????????'
            value={computed.formatFullDate(date.customRange)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'single', id: 'customRange' },
                },
                target: {
                  dataset: { type: 'single', id: 'customRange' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='?????????????????????'
            value={computed.formatRange(date.customConfirm)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'customConfirm' },
                },
                target: {
                  dataset: { type: 'range', id: 'customConfirm' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='?????????????????????'
            value={computed.formatRange(date.customDayText)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'customDayText' },
                },
                target: {
                  dataset: { type: 'range', id: 'customDayText' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='?????????????????????'
            value={computed.formatFullDate(date.customPosition)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'single', id: 'customPosition' },
                },
                target: {
                  dataset: { type: 'single', id: 'customPosition' },
                },
              })
            }}
          />
          <Cell
            isLink
            title='????????????????????????'
            value={computed.formatRange(date.maxRange)}
            onClick={(e) => {
              this.show({
                detail: e.detail,
                currentTarget: {
                  dataset: { type: 'range', id: 'maxRange' },
                },
                target: {
                  dataset: { type: 'range', id: 'maxRange' },
                },
              })
            }}
          />
        </DemoBlock>
        <DemoBlock title='????????????'>
          <Calendar
            title='??????'
            poppable={false}
            showConfirm={false}
            minDate={tiledMinDate}
            maxDate={tiledMaxDate}
            firstDayOfWeek={firstDayOfWeek}
            className='tiled-calendar'
          />
        </DemoBlock>
        <Calendar
          visible={showCalendar}
          type={type}
          color={color}
          round={round}
          position={position}
          minDate={minDate}
          maxDate={maxDate}
          maxRange={maxRange}
          formatter={formatter}
          showConfirm={showConfirm}
          confirmText={confirmText}
          confirmDisabledText={confirmDisabledText}
          firstDayOfWeek={firstDayOfWeek}
          onConfirm={this.onConfirm}
          onSelect={this.onSelect}
          onUnselect={this.onUnselect}
          onOpen={this.onOpen}
          onOpened={this.onOpened}
          onClose={this.onClose}
          onClosed={this.onClosed}
        />
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Calendar ??????',
  enableShareAppMessage: true,
})
