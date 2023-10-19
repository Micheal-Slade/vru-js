// store.js This is a useful way of sharing data across components.
// src/store/store.js
import { writable } from 'svelte/store';
import { csv } from 'd3-fetch';

export const dataStore = writable({
  data: [],
  headers: [],
  selectedHeaders: []
});

export const fetchData = async () => {
  const csvData = await csv("/data.csv");
  if (csvData.length > 0) {
    const headers = Object.keys(csvData[0]);
    const selectedHeaders = headers.slice(0, 5); // Assuming 5 columns per page
    dataStore.set({ data: csvData, headers, selectedHeaders });
  }
};
