import React from "react";
import {
  TextField,
  InputAdornment,
  List,
  Box,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchRounded";

import "./search.css";

// TODO - move type
import { Result } from "../../containers/search";

type SearchLayoutProps = {
  value: string;
  results: Result[];
  handleInputChange(input: React.ChangeEvent<HTMLInputElement>): void;
  handleKeyDown(keyEvent: React.KeyboardEvent<HTMLInputElement>): void;
  handleSelectResult(result: Result): void;
};

export const SearchLayout = ({
  value,
  results,
  handleInputChange,
  handleKeyDown,
  handleSelectResult,
}: SearchLayoutProps) => (
  <Box className="search">
    <TextField
      variant="outlined"
      label="Search..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        value,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
      }}
    />
    {results.length > 0 && (
      <List className="search-list">
        {results.map((result) => (
          <ListItemButton
            key={result.id}
            onClick={() => handleSelectResult(result)}
          >
            {result.name}
          </ListItemButton>
        ))}
      </List>
    )}
  </Box>
);
