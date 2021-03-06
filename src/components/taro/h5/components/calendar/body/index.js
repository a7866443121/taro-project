import Nerv from "nervjs";
import { __decorate } from "tslib";
import bind from 'bind-decorator';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import Taro from "@tarojs/taro-h5";
import { delayQuerySelector } from '../../../common/utils';
import generateCalendarGroup from '../common/helper';
import AtCalendarDateList from '../ui/date-list/index';
import AtCalendarDayList from '../ui/day-list/index';
const ANIMTE_DURATION = 300;
const defaultProps = {
  marks: [],
  selectedDate: {
    end: Date.now(),
    start: Date.now()
  },
  format: 'YYYY-MM-DD',
  generateDate: Date.now()
};
export default class AtCalendarBody extends Taro.Component {
  constructor(props) {
    super(props);
    this.changeCount = 0;
    this.currentSwiperIndex = 1;
    this.startX = 0;
    this.swipeStartPoint = 0;
    this.isPreMonth = false;
    this.maxWidth = 0;
    this.isTouching = false;

    const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = props;
    this.generateFunc = generateCalendarGroup({
      validDates,
      format,
      minDate,
      maxDate,
      marks,
      selectedDates
    });
    const listGroup = this.getGroups(generateDate, selectedDate);
    this.state = {
      listGroup,
      offsetSize: 0,
      isAnimate: false
    };
  }
  componentDidMount() {
    delayQuerySelector(this, '.at-calendar-slider__main').then(res => {
      this.maxWidth = res[0].width;
    });
  }
  componentWillReceiveProps(nextProps) {
    const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = nextProps;
    this.generateFunc = generateCalendarGroup({
      validDates,
      format,
      minDate,
      maxDate,
      marks,
      selectedDates
    });
    const listGroup = this.getGroups(generateDate, selectedDate);
    this.setState({
      offsetSize: 0,
      listGroup
    });
  }
  getGroups(generateDate, selectedDate) {
    const dayjsDate = dayjs(generateDate);
    const arr = [];
    const preList = this.generateFunc(dayjsDate.subtract(1, 'month').valueOf(), selectedDate);
    const nowList = this.generateFunc(generateDate, selectedDate, true);
    const nextList = this.generateFunc(dayjsDate.add(1, 'month').valueOf(), selectedDate);
    const preListIndex = this.currentSwiperIndex === 0 ? 2 : this.currentSwiperIndex - 1;
    const nextListIndex = this.currentSwiperIndex === 2 ? 0 : this.currentSwiperIndex + 1;
    arr[preListIndex] = preList;
    arr[nextListIndex] = nextList;
    arr[this.currentSwiperIndex] = nowList;
    return arr;
  }
  handleTouchStart(e) {
    if (!this.props.isSwiper) {
      return;
    }
    this.isTouching = true;
    this.startX = e.touches[0].clientX;
  }
  animateMoveSlide(offset, callback) {
    this.setState({
      isAnimate: true
    }, () => {
      this.setState({
        offsetSize: offset
      });
      setTimeout(() => {
        this.setState({
          isAnimate: false
        }, () => {
          callback && callback();
        });
      }, ANIMTE_DURATION);
    });
  }
  handleTouchEnd() {
    if (!this.props.isSwiper) {
      return;
    }
    const { offsetSize } = this.state;
    this.isTouching = false;
    const isRight = offsetSize > 0;
    const breakpoint = this.maxWidth / 2;
    const absOffsetSize = Math.abs(offsetSize);
    if (absOffsetSize > breakpoint) {
      const res = isRight ? this.maxWidth : -this.maxWidth;
      return this.animateMoveSlide(res, () => {
        this.props.onSwipeMonth(isRight ? -1 : 1);
      });
    }
    this.animateMoveSlide(0);
  }
  handleChange(e) {
    const { current, source } = e.detail;
    if (source === 'touch') {
      this.currentSwiperIndex = current;
      this.changeCount += 1;
    }
  }
  handleAnimateFinish() {
    if (this.changeCount > 0) {
      this.props.onSwipeMonth(this.isPreMonth ? -this.changeCount : this.changeCount);
      this.changeCount = 0;
    }
  }
  handleSwipeTouchStart(e) {
    const { clientY, clientX } = e.changedTouches[0];
    this.swipeStartPoint = this.props.isVertical ? clientY : clientX;
  }
  handleSwipeTouchEnd(e) {
    const { clientY, clientX } = e.changedTouches[0];
    this.isPreMonth = this.props.isVertical ? clientY - this.swipeStartPoint > 0 : clientX - this.swipeStartPoint > 0;
  }
  render() {
    const { isSwiper } = this.props;
    const { isAnimate, offsetSize, listGroup } = this.state;
    if (!isSwiper) {
      return <View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${"h5"}`)}>
          <AtCalendarDayList />
          <View className="main__body body">
            <View className="body__slider body__slider--now">
              <AtCalendarDateList list={listGroup[1].list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick} />
            </View>
          </View>
        </View>;
    }
    /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
    {
      return <View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${"h5"}`)} onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
          <AtCalendarDayList />
          <View className={classnames('main__body  body', {
          'main__body--slider': isSwiper,
          'main__body--animate': isAnimate
        })} style={{
          transform: isSwiper ? `translateX(-100%) translate3d(${offsetSize},0,0)` : '',
          WebkitTransform: isSwiper ? `translateX(-100%) translate3d(${offsetSize}px,0,0)` : ''
        }}>
            <View className="body__slider body__slider--pre">
              <AtCalendarDateList list={listGroup[0].list} />
            </View>
            <View className="body__slider body__slider--now">
              <AtCalendarDateList list={listGroup[1].list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick} />
            </View>
            <View className="body__slider body__slider--next">
              <AtCalendarDateList list={listGroup[2].list} />
            </View>
          </View>
        </View>;
    }
    return <View className={classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${"h5"}`)}>
        <AtCalendarDayList />
        <Swiper circular current={1} skipHiddenItemLayout className={classnames('main__body')} onChange={this.handleChange} vertical={this.props.isVertical} onAnimationFinish={this.handleAnimateFinish} onTouchEnd={this.handleSwipeTouchEnd} onTouchStart={this.handleSwipeTouchStart}>
          {listGroup.map((item, key) => <SwiperItem key={item.value} itemId={key.toString()}>
              <AtCalendarDateList list={item.list} onClick={this.props.onDayClick} onLongClick={this.props.onLongClick} />
            </SwiperItem>)}
        </Swiper>
      </View>;
  }
  handleTouchMove = e => {
    if (!this.props.isSwiper) {
      return;
    }
    if (!this.isTouching) return;
    const { clientX } = e.touches[0];
    const offsetSize = clientX - this.startX;
    this.setState({
      offsetSize
    });
  };
}
AtCalendarBody.defaultProps = defaultProps;
AtCalendarBody.options = { addGlobalClass: true };
__decorate([bind], AtCalendarBody.prototype, "getGroups", null);
__decorate([bind], AtCalendarBody.prototype, "handleTouchStart", null);
__decorate([bind], AtCalendarBody.prototype, "handleTouchEnd", null);
__decorate([bind], AtCalendarBody.prototype, "handleChange", null);
__decorate([bind], AtCalendarBody.prototype, "handleAnimateFinish", null);
__decorate([bind], AtCalendarBody.prototype, "handleSwipeTouchStart", null);
__decorate([bind], AtCalendarBody.prototype, "handleSwipeTouchEnd", null);