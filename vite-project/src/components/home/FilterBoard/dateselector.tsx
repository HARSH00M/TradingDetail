import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  statename: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  value: string | null;  // New prop for controlled value
}

const DatePicker: React.FC<DatePickerProps> = ({ statename, setState, value }) => {
  const datePickerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      const datepicker = flatpickr(datePickerRef.current, {
        dateFormat: 'd-m-Y',
        defaultDate: value || null,  // Set initial date or clear if null
        onChange: (selectedDates) => {
          const selectedDate = selectedDates.length > 0 ? flatpickr.formatDate(selectedDates[0], 'd-m-Y') : null;
          setState((prevState: any) => ({
            ...prevState,
            [statename]: selectedDate,
          }));
        },
      });

      // Styling adjustments for the calendar
      const calendarContainer = datepicker.calendarContainer;
      const calendarMonthNav = datepicker.monthNav;
      const calendarNextMonthNav = datepicker.nextMonthNav;
      const calendarPrevMonthNav = datepicker.prevMonthNav;
      const calendarDaysContainer = datepicker.daysContainer;

      if (calendarContainer) {
        calendarContainer.className = `${calendarContainer.className} bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal`;
      }
      if (calendarMonthNav) {
        calendarMonthNav.className = `${calendarMonthNav.className} flex items-center justify-between mb-4 [&>div.flatpickr-month]:-translate-y-3`;
      }
      if (calendarNextMonthNav) {
        calendarNextMonthNav.className = `${calendarNextMonthNav.className} absolute !top-2.5 !right-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
      }
      if (calendarPrevMonthNav) {
        calendarPrevMonthNav.className = `${calendarPrevMonthNav.className} absolute !top-2.5 !left-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
      }
      if (calendarDaysContainer) {
        calendarDaysContainer.className = `${calendarDaysContainer.className} [&_span.flatpickr-day]:!rounded-md [&_span.flatpickr-day.selected]:!bg-gray-900 [&_span.flatpickr-day.selected]:!border-gray-900`;
      }

      // Cleanup the Flatpickr instance on unmount
      return () => {
        datepicker.destroy();
      };
    }
  }, [statename, setState, value]); // Adding value dependency to re-render when reset

  // Update the input field whenever value changes to clear input if needed
  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.value = value || '';
    }
  }, [value]);

  return (
    <div className="relative min-w-[200px]">
      <input
        ref={datePickerRef}
        id="date-picker"
        className="peer h-full w-full rounded-[7px] border border-gray-300 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
      />
      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        Select a Date
      </label>
    </div>
  );
};

export default DatePicker;