import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function DrawersSetup() {
    
    const dispatch = useDispatch();

    const [inputFields, setInputFields] = useState([])
    const bars = useSelector(store => store.bars)
    const newBarId = bars[bars.length-1].id;


    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index] = event.target.value;
        
        setInputFields(data);
    }

    const addFields = (event) => {
        event.preventDefault();
        let newField = ''
        setInputFields([...inputFields, newField]);
    }

    const onSubmitDrawers = (event) => {
        event.preventDefault();

        dispatch({
            type: 'SAGA/ADD_DRAWERS',
            payload: [inputFields, newBarId]
        })
    }

  return (
    <div className="App">
      <form>
        {inputFields.map((input, index) => {
            return(
                <div key={index}>
                    <input
                        name='name'
                        placeholder="Name"
                        value={input.name}
                        onChange={event => handleFormChange(index, event)}
                    />
                </div>
            )
        })}
        <button onClick={addFields}> + </button>
        <button onClick={onSubmitDrawers}>Submit Drawers</button>
      </form>
    </div>
  );
}

export default DrawersSetup;
