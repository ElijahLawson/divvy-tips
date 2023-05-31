import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditTable from "../../components/EditTable/EditTable";

function HoursConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const shift_tips = useSelector((store) => store.shiftTips);

  console.log(shift_tips);

  const tableConfig = {
    data: shift_tips,
    defaultState: [{ id: "", bartender: "", hours_worked: ""}],
    defaultAddValues: [{ bartender: "", hours_worked: ""}],
    navRoute : '/tips-edit',
    cols: ['Bartender', 'Hours'],
    sagaRoute: ''
  }

  const fetchData = () => {
    dispatch({
      type: "SAGA/FETCH_SHIFT_TIPS"
    })
  };

  const onHoursConfirm = (event) => {
    event.preventDefault();

    navigate("/tips-edit");
  };

  return (
    <div>
      <div>
        <h2>Confirm / Edit Hours</h2>
        
        <EditTable tableConfig={tableConfig}/>

      </div>

    </div>
  );
}

export default HoursConfirmation;
