import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditTipsTable from "../../components/EditTipsTable/EditTipsTable";
function TipsConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const shift = useSelector((store) => store.shifts);
  const shiftTips = useSelector((store) => store.shiftTips);

  const fetchData = () => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });

    // console.log(shift.id);

    // dispatch({
    //     type: 'SAGA/FETCH_SHIFT_TIPS',
    //     payload: shift.id
    // })
  };

  const onTipsConfirm = (event) => {
    event.preventDefault();

    navigate("/tip-out");
  };

  return (
    <div>
      <div>
        <h2>Confirm / Edit Tips</h2>
        
        <EditTipsTable />

      </div>

    </div>
  );
}

export default TipsConfirmation;
