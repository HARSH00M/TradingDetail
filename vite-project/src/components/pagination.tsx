
const Pagination = ({ pages, currentPage, setCurrentPage}: { pages: number, currentPage : number, setCurrentPage : any }) => {

  const handlePrev = () => {
    setCurrentPage((prev : any) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev : any) => Math.min(prev + 1, pages - 1));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handlePrev}
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        disabled={currentPage === 0}
      >
        Prev
      </button>

      <div className="max-w-96 h-full flex flex-row overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track scrollbar-track-gray-300">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`rounded-full py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 active:bg-slate-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 ${
              currentPage === i ? 'bg-slate-800 text-white' : 'border border-slate-300 text-slate-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        disabled={currentPage === pages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
