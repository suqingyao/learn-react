import { CSSProperties, ReactNode, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import cs from 'classnames';
import { MonthCalendar } from './month-calendar';
import { Header } from './header';
import LocaleContext from './locale-context';
import './index.scss';

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  dateRender?: (currentDate: Dayjs) => ReactNode;
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

export const Calendar = (props: CalendarProps) => {
  const { value, style, className, locale, onChange } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value);

  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  const classNames = cs('calendar', className);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'));
  }

  function todayHandler() {
    const date = dayjs(Date.now());
    changeDate(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language
      }}
    >
      <div
        className={classNames}
        style={style}
      >
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
};
