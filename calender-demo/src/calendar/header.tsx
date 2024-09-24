import { Dayjs } from 'dayjs';
import { useContext } from 'react';
import LocaleContext from './locale-context';
import allLocales from './locale';

interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

export const Header = (props: HeaderProps) => {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props;

  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];

  return (
    <div className="calendar-header">
      <div
        className="calendar-header-icon"
        onClick={prevMonthHandler}
      >
        &lt;
      </div>
      <div className="calender-header-value">{curMonth.format(CalendarContext.formatMonth)}</div>
      <div
        className="calendar-header-icon"
        onClick={nextMonthHandler}
      >
        &gt;
      </div>
      <button
        className="calendar-header-btn"
        onClick={todayHandler}
      >
        {CalendarContext.today}
      </button>
    </div>
  );
};
