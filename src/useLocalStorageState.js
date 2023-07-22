import { useEffect, useState } from "react";

export function useLocalStorageState(imitialState, Key) {
  const [value, setValue] = useState(function () {
    const storedMovie = localStorage.getItem(Key);
    return  storedMovie ?  JSON.parse(storedMovie) : imitialState;
  });

  useEffect(() => {

    localStorage.setItem(Key, JSON.stringify(value));
  }, [value, Key]);
  return [value, setValue];
}
