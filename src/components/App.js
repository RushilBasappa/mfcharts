import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import "../styles/App.css";
import StockChart from "./StockChart";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { Button } from "@material-ui/core";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listMF, setlistMF] = useState([]);
  const [selectedMF, setSelectedMF] = useState(
    JSON.parse(localStorage.getItem("selectedMF")) || []
  );

  useEffect(() => {
    axios.get(`https://api.mfapi.in/mf/search?q=${searchQuery}`).then((res) => {
      setlistMF(res.data);
    });
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("selectedMF", JSON.stringify(selectedMF));
  }, [selectedMF]);

  return (
    <div>
      <div>
        <h1>MF Charts</h1>
        <Autocomplete
          multiple
          options={listMF}
          onChange={(_, value) => {
            setSelectedMF(value.map((schemeData) => schemeData));
          }}
          limitTags={2}
          value={selectedMF}
          getOptionLabel={(option) => option.schemeName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search MF"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        />
        {/* <Button>Save to local</Button> */}
      </div>
      {selectedMF.map((schemeData) => {
        const { schemeCode } = schemeData;
        const url = `https://api.mfapi.in/mf/${schemeCode}`;
        return <StockChart url={url} key={schemeCode} />;
      })}
    </div>
  );
};

export default hot(App);
