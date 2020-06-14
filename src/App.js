import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Stage from "./components/Stage";
import dummyData from "./assets/rankList";
import Toastify from "./components/Toastify";
import cloneDeep from "lodash/cloneDeep";

const MAX_POINT = 2500;

function App() {
  const [rankList, setRankList] = useState(dummyData);
  const [showToast, setShowToast] = useState(false);
  const [tempDataUpdate, setTempDataUpdate] = useState([]);

  useEffect(() => {
    let data = cloneDeep(rankList);
    data
      .sort((a, b) => b.point - a.point)
      .map(
        (item) =>
          (item.rate =
            item.point > 0 ? Math.round((item.point / MAX_POINT) * 100) : 0)
      );
    console.log(data);
    setRankList(data);
  }, []);

  const deleteItem = (key) => {
    let data = rankList.filter((item) => item.no !== key);
    setRankList(data);
    setShowToast(true);
  };

  const handleChange = (event, key) => {
    setTempDataUpdate([]);
    const tempData = cloneDeep(rankList);
    let itemIndex = tempData.findIndex((item) => item.no === key);
    tempData[itemIndex][event.target.name] = event.target.value;
    tempData
      .sort((a, b) => b.point - a.point)
      .map(
        (item) =>
          (item.rate =
            item.point > 0 ? Math.round((item.point / MAX_POINT) * 100) : 0)
      );
    setTempDataUpdate(tempData);
  };

  const handleUpdate = () => {
    setRankList(tempDataUpdate);
    setTempDataUpdate([]);
  };

  return (
    <div className="App">
      <Header />
      <Toastify
        title="Successfully"
        content="Deleted this successfully!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <Stage
        rankList={rankList}
        handleDelete={deleteItem}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
