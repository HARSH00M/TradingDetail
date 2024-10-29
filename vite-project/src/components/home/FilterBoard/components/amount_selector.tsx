import { forwardRef } from "react"

type props = {
    placeholder: string,
}


export default forwardRef<HTMLInputElement, props>(({ placeholder }, ref) => {
    return (
        <div>
            <input
                type="number"
                max="999999999999"
                ref = {ref}
                placeholder={placeholder}// Ensures value doesn't exceed 10 digits
                onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.value.length > 5) { // Restrict to 5 digits
                        target.value = target.value.slice(0, 12); // Truncate input if exceeds max length
                    }
                }}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            />


        </div>
    )
})