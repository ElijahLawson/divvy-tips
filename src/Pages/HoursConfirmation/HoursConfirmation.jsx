import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditTable from "../../components/EditTable/EditTable";

function HoursConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Redux Stores
  const shift_tips = useSelector((store) => store.shiftTips);

  //Config data to pass to the hours editTable as a prop
  const tableConfig = {
    data: shift_tips,
    defaultState: [{ id: "", bartender: "", hours_worked: ""}],
    defaultAddValues: [{ bartender: "", hours_worked: ""}],
    navRoute : '/tips-edit',
    cols: ['Bartender', 'Hours'],
    sagaRoute: ''
  }

  //Looks like I don't think I'll use this but I won't take it out quite yet.
  const fetchData = () => {
    dispatch({
      type: "SAGA/FETCH_SHIFT_TIPS"
    })
  };

  //Looks like I don't think I'll use this but I won't take it out quite yet.
  const onHoursConfirm = (event) => {
    event.preventDefault();

    navigate("/tips-edit");
  };

  return (
    <div>
      <div>
        <h2 className="text-center mt-5 text-3xl mb-4">Confirm / Edit Hours</h2>
        
        <EditTable tableConfig={tableConfig}/>

      </div>

    </div>
  );
}

export default HoursConfirmation;
