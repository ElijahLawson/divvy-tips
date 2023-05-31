import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import Popup from "reactjs-popup";

// WARNING TO ALL WHO SET FOOT HERE, ONLY TARAVANGIAN ON HIS BEST DAY COULD DECIPHER WHAT IS HAPPENING HERE. TREAD WITH CARE.

function EditTipsTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drawers = useSelector(store => store.drawers);
  const shiftDrawers = useSelector(store => store.shiftDrawers);
  const shift_tips = useSelector((store) => store.shiftTips);
  const shift = useSelector(store => store.shifts);

  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const newData = useMemo(() => {
    const copiedData = [...data];
    for (const index in copiedData) {
      for (const updatedData of updateData) {
        if (copiedData[index]?.id === updatedData.id) {
          copiedData[index] = updatedData
        }
      }
    }
    return copiedData;
  }, [data, updateData]);

  const [drawerId, setDrawerId] = useState(0);
  const [drawerName, setDrawerName] = useState('');
  const [locationId, setLocationId] = useState(0);
  const [shiftId, setShiftId] = useState(0);
  const [chargedTipsInput, setChargedTipsInput] = useState([]);

  const [open, setOpen] = useState(false);

  console.log(data);
  console.log(updateData);
  console.log(addData);
  console.log(newData);
  console.log(drawers);

  console.log(shift_tips)

  const parseDrawers = () => {
    for (let drawer of drawers) {
      for (let shift_tip of shift_tips) {
        if (drawer.id === shift_tip.drawer_id) {
          drawer.charged_tips = shift_tip.total_tips;
          drawer.shift_tips_id = shift_tip.shift_tips_id;
        }
        drawer.shift_id = shift.id
      }
      if (!drawer.charged_tips) {
          drawer.charged_tips = '0';
      }
    }
    return drawers;
  }

  const fetchData = () => {

    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });

    const formattedData = parseDrawers();
    
    setData([...formattedData]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewEdit = (id, name, shift_id, location_id) => {
    setDrawerId(id);
    setDrawerName(name);
    setLocationId(location_id)
    setShiftId(shift_id);
    setChargedTipsInput(0)
    setOpen((o) => !o);
  };

  const editRow = () => {
    const dataToEdit = {
      id: drawerId,
      name: drawerName,
      charged_tips: chargedTipsInput,
      location_id: locationId,
      shift_id: shiftId,
    };
    setUpdateData([...updateData, dataToEdit])
    setOpen((o) => !o);
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    editRow();
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const onConfirm = () => {
    //okay so on confirm just make shift_tips with just the drawer id and the total_tips
    const filteredEdits = newData.filter(editedDrawer => {
      return shift_tips.map(shiftDrawer => shiftDrawer.drawer_id).includes(editedDrawer.id);
    })

    const addedDrawers = newData.filter(drawer => {
      return !filteredEdits.map(filteredDrawer => filteredDrawer.id).includes(drawer.id);
    }).filter(drawer => drawer.charged_tips != '0');

    if (filteredEdits.length > 0) {
      dispatch({
        type: 'SAGA/EDIT_SHIFT_TIPS_DRAWERS',
        payload: filteredEdits
      })
    }

    if (addedDrawers.length > 0) {
      dispatch({
        type: 'SAGA/ADD_SHIFT_TIPS_DRAWERS_ONLY',
        payload: addedDrawers
      })
    }

    console.log(filteredEdits);
    console.log(addedDrawers);
    
    navigate("/tip-out");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Drawer</th>
            <th>Charged Tips</th>
          </tr>
        </thead>
        <tbody>
          {newData.map((drawer) => {
            return (
              <tr>
                <td>{drawer.name}</td>
                <td>{drawer.charged_tips}</td>
                <td>
                  <button onClick={() => handleNewEdit(drawer.id, drawer.name, drawer.shift_id, drawer.location_id)}>Edit</button>
                  <Popup open={open} closeOnDocumentClick>
                    <div>
                      <h1>Drawer Tips Edit</h1>
                      <form onSubmit={(event) => handleConfirm(event)}>
                        <h3>{drawer.name}</h3>
                        <label>
                          Charged Tips:
                          <input
                            type="number"
                            name="chargedTips"
                            value={chargedTipsInput}
                            required
                            onChange={(event) =>
                              setChargedTipsInput(event.target.value)
                            }
                          />
                        </label>
                        <div>
                          <button type="submit">Confirm</button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onConfirm}>Next</button>
    </div>
  );
}

export default EditTipsTable;
