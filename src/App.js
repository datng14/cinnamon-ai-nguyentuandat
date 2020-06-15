import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Stage from "./components/Stage";
import dummyData from "./assets/rankList";
import cloneDeep from "lodash/cloneDeep";
import { useSnackbar } from "notistack";

const MAX_POINT = 2500;

function App() {
  const [rankList, setRankList] = useState(dummyData);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let data = cloneDeep(rankList);
    data
      .sort((a, b) => b.point - a.point)
      .map(
        (item) =>
          (item.level =
            item.point > 0 ? Math.round((item.point / MAX_POINT) * 100) : 0)
      );
    setRankList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = (selected) => {
    let data = rankList.filter((item) => !selected.includes(item.no));
    setRankList(data);
    enqueueSnackbar("Deleted Successfully!", { variant: "success" });
  };

  const handleUpdate = (data) => {
    const tempData = cloneDeep(rankList);
    let itemIndex = tempData.findIndex((item) => item.no === data.no);
    tempData[itemIndex] = data;
    tempData[itemIndex].point = parseInt(data.point, 10);
    tempData
      .sort((a, b) => b.point - a.point)
      .map(
        (item) =>
          (item.level =
            item.point > 0 ? Math.round((item.point / MAX_POINT) * 100) : 0)
      );
    setRankList(tempData);
  };

  return (
    <div className="App">
      <Header />

      <Stage
        rankList={rankList}
        handleDelete={deleteItem}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
