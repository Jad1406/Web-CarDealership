import React, { useState, useEffect } from "react";
import { TextField, Popper, Paper, List, ListItem, ClickAwayListener, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from local storage when component mounts
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Function to handle search submission
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      //Limiting the search history to 5 items
      const updatedHistory = [searchTerm, ...history.filter((item) => item !== searchTerm)].slice(0, 5);
      //Update the history state
      setHistory(updatedHistory);
      setSearchTerm(""); // Clear input after search
      setAnchorEl(null); // Close history dropdown
      onSearch(searchTerm); //Update the search term in the parent component (The onSearch function has been passed)
    }
  };

  //If the seach bar has been focused on (selected), drop the search history anchor
  const handleFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //If the user clicks away from the search bar, close the search history dropdown
  const handleBlur = () => {
    setAnchorEl(null);
  };

  //Function to handle the selection of a history item
  const handleSelectHistory = (item) => {
    setSearchTerm(item); // Set the search term to the selected history item
    setAnchorEl(null);
  };

  return (

    //Using the MUI library, we have created a text field with a search icon at the end
    //This component handle the clickOn and clickAway events to show and hide the search history (Focus and Blur)
    <ClickAwayListener onClickAway={handleBlur}>
      <div style={{ position: "relative", width: "300px" }}>
        <TextField
          fullWidth
          label="Search for a car"
          variant="standard" // Using standard variant
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleSearch} // Capture Enter key press
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
          <Paper style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
            <List>
              {history.map((item, index) => (
                <ListItem button key={index} onClick={() => handleSelectHistory(item)}>
                  {item}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
