import React, { useCallback, useState } from "react";
import { SearchLayout } from "../../components/search";

type SearchProps = {
  setLocation(lat: number, lng: number): void;
};

type ServerResult = {
  place_id: number;
  display_name: string;
  lat: number;
  lon: number;
};

export type Result = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

const getResult = (serverResult: ServerResult): Result => ({
  id: serverResult.place_id,
  name: serverResult.display_name,
  lat: Number(serverResult.lat),
  lng: Number(serverResult.lon),
});

export const Search = ({ setLocation }: SearchProps) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handleInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => setInput(evt.target.value),
    []
  );

  const search = useCallback(() => {
    setResults([]);
    fetch(
      `https://nominatim.openstreetmap.org/search?city=${input}&format=json`
    ).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setResults(data.map(getResult));
    });
  }, [input]);

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (evt.code === "Enter") {
        search();
      }
    },
    [search]
  );

  const handleSelectResult = useCallback(
    (result: Result) => {
      const { lat, lng } = result;

      console.log(lat, lng);
      setResults([]);
      setInput("");
      setLocation(lat, lng);
    },
    [setLocation]
  );

  return (
    <SearchLayout
      value={input}
      results={results}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      handleSelectResult={handleSelectResult}
    />
  );
};
