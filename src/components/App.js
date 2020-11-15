import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import "../styles/App.css";
import StockChart from "./StockChart";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listMF, setlistMF] = useState([]);
  const [selectedMF, setSelectedMF] = useState([]);

  useEffect(() => {
    axios.get(`https://api.mfapi.in/mf/search?q=${searchQuery}`).then((res) => {
      setlistMF(res.data);
    });
  }, [searchQuery]);

  return (
    <div>
      <div>
        <h1>MF Charts</h1>
        <Autocomplete
          multiple
          options={listMF}
          onChange={(_, value) => {
            setSelectedMF(value.map((schemaData) => schemaData.schemeCode));
          }}
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
      </div>

      {selectedMF.map((schemaCode) => {
        const url = `https://api.mfapi.in/mf/${schemaCode}`;
        return <StockChart url={url} />;
      })}
    </div>
  );
};

export default hot(App);
