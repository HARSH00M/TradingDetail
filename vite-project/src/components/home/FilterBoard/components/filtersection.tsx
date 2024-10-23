import { useRef } from 'react';
import DatePicker, { DatePickerRef } from './dateselector'; // Import DatePicker with DatePickerRef type

// type DataProps = {
//   modeofacquisition: string[];
//   securitytype: string[];
//   transactiontype: string[];
// };

// export default function FilterSection({
//   apply,
//   filterstate,
//   reset,
//   setState,
//   data,
// }: {
//   apply: any;
//   reset: any;
//   filterstate: any;
//   setState: any;
//   data: DataProps;
// }) {


export default function FilterSection({
  apply,
  reset,
  setState,
}: {
  apply: any;
  reset: any;
  setState: any;
}) {
  const fromDatePickerRef = useRef<DatePickerRef>(null); // Create refs for DatePickers
  const toDatePickerRef = useRef<DatePickerRef>(null);

  
  // Function to reset the date pickers
  function resetAll() {
    if (fromDatePickerRef.current) fromDatePickerRef.current.resetDate(); // Reset "from" date
    if (toDatePickerRef.current) toDatePickerRef.current.resetDate(); // Reset "to" date
    reset(); // Call parent reset function to reset state
  }

  return (
    <div className="md:px-14 flex flex-col justify-center items-center w-5/6">
      <div className="flex w-full md:py-8 ">
        <h1 className="mx-auto text-xl md:text-3xl text-gray-700 font-semibold">
          Recent Transactions Happened
        </h1>
      </div>

      <div className="flex justify-center md:justify-start items-center py-4 gap-y-2 gap-x-2 flex-wrap md:gap-x-4">
        <DatePicker statename="fromdate" setState={setState} ref={fromDatePickerRef} />
        <p>to</p>
        <DatePicker statename="todate" setState={setState} ref={toDatePickerRef} />

        <button
          onClick={resetAll}
          className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          Reset
        </button>
        <button
          onClick={apply}
          className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
