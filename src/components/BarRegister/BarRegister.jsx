import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DrawersSetup from "../DrawersSetup/DrawersSetup";
import NavBar from "../NavBar/NavBar";

function BarRegister() {
  const dispatch = useDispatch();

  const [barName, setBarName] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [barBackCut, setBarBackCut] = useState("");
  const [barRegistered, setBarRegistered] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_BARS'
    })
  }, [dispatch])

  const registerBar = (event) => {
    event.preventDefault();
    
    dispatch({
      type: "SAGA/REGISTER_BAR",
      payload: {
        barName: barName,
        city: city,
        stateCode: stateCode,
        barBackCut: barBackCut,
      },
    });

    setBarRegistered(true);
  };

  return (
    <div>
      <NavBar />
      <h1>Location Setup</h1>
      <form>
        <div>
          <label>
            Bar Name:
            <input
              type="text"
              name="barName"
              value={barName}
              required
              onChange={(event) => setBarName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            State:
            <input
              type="text"
              name="barname"
              value={stateCode}
              required
              onChange={(event) => setStateCode(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Bar Back Cut:
            <input
              type="text"
              name="barbackcut"
              value={barBackCut}
              required
              onChange={(event) => setBarBackCut(event.target.value)}
            />
          </label>
        </div>
        <div>
        </div>
        <div>
          <button type="submit" onClick={registerBar}>
            Register Bar
          </button>
        </div>
        {barRegistered && <Popup
            trigger={<button type='button'> Setup Drawers </button>}
            position="right center"
            modal
          >
            <DrawersSetup site={[city, stateCode]}/>
          </Popup>
        }
      </form>
    </div>
  );
}

export default BarRegister;
