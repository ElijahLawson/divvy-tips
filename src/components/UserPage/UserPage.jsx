import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";

function UserPage() {
  const user = useSelector((store) => store.user);
  const bar = useSelector((store) => store.bars);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch({
      type: "SAGA/FETCH_USER_BAR",
    }),
      dispatch({
        type: "SAGA/FETCH_DRAWERS",
        payload: user.location_id,
      });
  };

  const onAddTips = () => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });

    navigate("/add-tips");
  };

  const onRunMoney = () => {
    navigate("/shift-setup");
  };

  const onShiftHistory = () => {
    navigate("/shift-history");
  };

  return (
    <div>
      <div>
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        <h3>{bar[0]?.name}</h3>
      </div>

      <div>
        <button onClick={onAddTips}>Add Tips</button>
      </div>
      <div>
        <button onClick={onRunMoney}>Run Money</button>
      </div>
      <div>
        <button onClick={onShiftHistory}>Shift History</button>
      </div>
    </div>
  );
}

export default UserPage;
