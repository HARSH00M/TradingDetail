import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  statename: string;
  setState: React.Dispatch<React.SetStateAction<any>>; // Correct type for setState
  placeholder : string
}

export interface DatePickerRef {
  resetDate: () => void; // Expose a resetDate method
}

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(({ statename, setState, placeholder }, ref) => {
  const datePickerRef = useRef<HTMLInputElement | null>(null); // Define the ref with the correct type

  useEffect(() => {
    if (datePickerRef.current) {
      const datepicker = flatpickr(datePickerRef.current, {
        dateFormat: 'Y-m-d', // Set date format to dd-MM-yyyy
        onChange: (selectedDates: any) => {
          // Get the selected date in the specified format
          const selectedDate = selectedDates.length > 0 ? flatpickr.formatDate(selectedDates[0], 'Y-m-d') : null;

          // Update state with the selected date using statename as the key
          setState((prevState: any) => ({
            ...prevState,
            [statename]: selectedDate, // Assign the selected date to the statename key
          }));
        },
      });

      // Styling the date picker
      const calendarContainer = datepicker.calendarContainer;
      const calendarMonthNav = datepicker.monthNav;
      const calendarNextMonthNav = datepicker.nextMonthNav;
      const calendarPrevMonthNav = datepicker.prevMonthNav;
      const calendarDaysContainer = datepicker.daysContainer;

      if (calendarContainer) {
        calendarContainer.className = `${calendarContainer.className} bg-white p-4 border border-gray-gray-50 rounded-lg shadow-lg shadow-gray-gray-500/10 font-sans text-sm font-normal text-gray-gray-500 focus:outline-none break-words whitespace-normal`;
      }

      if (calendarMonthNav) {
        calendarMonthNav.className = `${calendarMonthNav.className} flex items-center justify-between mb-4 [&>div.flatpickr-month]:-translate-y-3`;
      }

      if (calendarNextMonthNav) {
        calendarNextMonthNav.className = `${calendarNextMonthNav.className} absolute !top-2.5 !right-1.5 h-6 w-6 bg-transparent hover:bg-gray-gray-50 !p-1 rounded-md transition-colors duration-300`;
      }

      if (calendarPrevMonthNav) {
        calendarPrevMonthNav.className = `${calendarPrevMonthNav.className} absolute !top-2.5 !left-1.5 h-6 w-6 bg-transparent hover:bg-gray-gray-50 !p-1 rounded-md transition-colors duration-300`;
      }

      if (calendarDaysContainer) {
        calendarDaysContainer.className = `${calendarDaysContainer.className} [&_span.flatpickr-day]:!rounded-md [&_span.flatpickr-day.selected]:!bg-gray-900 [&_span.flatpickr-day.selected]:!border-gray-900`;
      }

      // Cleanup the Flatpickr instance on unmount
      return () => {
        datepicker.destroy();
      };
    }
  }, [statename, setState]); // Ensure that changes to statename or setState trigger useEffect

  // Expose resetDate method to parent via ref
  useImperativeHandle(ref, () => ({
    resetDate() {
      if (datePickerRef.current) {
        datePickerRef.current.value = ''; // Clear the input value
        setState((prevState: any) => ({
          ...prevState,
          [statename]: null, // Reset the selected date in the state
        }));
      }
    },
  }));

  return (
    <div className="relative min-w-[200px]">
      <input
        ref={datePickerRef}
        // id="date-picker"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 

        placeholder={placeholder}
      />
      
    </div>
  );
});

export default DatePicker;
