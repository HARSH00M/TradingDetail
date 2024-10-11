
function DropDown({title, data, state, setState} : {title : string, data : string[],state : string,  setState : any}) {

    const handleChange = (event : any) => {
      console.log([event.target.name], event.target.value)
      setState((prev : any) => ({
        ...prev,
        [event.target.name]: event.target.value === "all" ? null : event.target.value,
      }));
    };
  
    return (
      <div className="w-full">
  {data?.length > 0 ? (
    <select
      id={title}
      value={state || ""}
      name={title}
      onChange={handleChange}
      className="w-44 overflow-x-scroll border border-gray-300 p-2 rounded-lg"
    >
      <option value="" disabled>
        {title}
      </option>
      <option value='all' >
        all
      </option>
      {data.map((value: string, index: number) => ( value!==null ? 
        <option value={value} key={index}>
          {value}
        </option> : ''
      ))}
    </select>
  ) : null}
</div>

    );
  }
  
  export default DropDown;
  