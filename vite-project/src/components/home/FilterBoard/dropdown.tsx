
function DropDown({title, data, state, setState} : {title : string, data : string[],state : string,  setState : any}) {

    const handleChange = (event : any) => {
      setState(event.target.value);
    };
  
    return (
      <div style={{ padding: '20px' }}>
          {data  ? 
        <select id="gender" value={state} onChange={handleChange}>
          <option value="" disabled>{title}</option>
          {data?.map((value : string, index : any)=><option value={value} key={index}>{value}</option>)}
        </select>
          : null}
  
      </div>
    );
  }
  
  export default DropDown;
  