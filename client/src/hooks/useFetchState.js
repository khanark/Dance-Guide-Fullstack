import { useState } from "react";

export const useFetchState = (initialState) => {
  const { fetchState, setFetchState } = useState(initialState);
  return [fetchState, setFetchState];
};
