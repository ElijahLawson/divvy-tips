import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    })
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
      <div className="grid grid-cols-1 mt-10">
        <h1 className="text-4xl text-center">
          {user.first_name} {user.last_name}
        </h1>
        <h3 className="text-center">{bar[0]?.name}</h3>
      </div>
      <div className="grid grid-cols-1 place-items-center mt-10">
        <div>
          <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mr-2 mb-2 mt-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
           onClick={onAddTips}>Add Tips</button>
        </div>
        <div>
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mr-2 mb-2 mt-4 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" 
           onClick={onRunMoney}>Run Money</button>
        </div>
        <div>
          <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mr-2 mb-2 mt-4 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
           onClick={onShiftHistory}>Shift History</button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;