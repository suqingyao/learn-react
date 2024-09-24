import { Dayjs } from 'dayjs';
import cs from 'classnames';
import { CalendarProps } from '.';

import { useContext } from 'react';
import LocaleContext from './locale-context';
import allLocales from './locale';

export function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month');
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(6 * 7);

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false
    };
  }

  const len = daysInfo.length;

  for (let i = 0; i < len; i++) {
    const calcDate = startDate.add(i - day, 'day');
    daysInfo[i + day] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month()
    };
    console.log('🚀 ~ getAllDays ~ daysInfo:', daysInfo);
  }

  return daysInfo;
}

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

export const MonthCalendar = (props: MonthCalendarProps) => {
  console.log('MonthCalendar');

  const localeContext = useContext(LocaleContext);

  const { value, curMonth, dateRender, dateInnerContent, selectHandler } = props;

  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const days = getAllDays(curMonth);
  console.log('🚀 ~ MonthCalendar ~ days:', days);

  function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            className={
              'calendar-month-body-cell ' +
              (item.currentMonth ? 'calendar-month-body-cell-current' : '')
            }
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    'calendar-month-body-cell-date-value',
                    value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                      ? 'calendar-month-body-cell-date-selected'
                      : ''
                  )}
                >
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row) => <div className="calendar-month-body-row">{row}</div>);
  }

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div
            className="calendar-month-week-list-item"
            key={week}
          >
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">{renderDays(days)}</div>
    </div>
  );
};
