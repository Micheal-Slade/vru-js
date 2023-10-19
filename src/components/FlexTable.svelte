<script>
  import { onMount } from 'svelte';
  import { dataStore, fetchData } from '../store/store.js';

  let currentPage = 1;
  let columnsPerPage = 5;

  onMount(fetchData);

  const toggleColumn = (header) => {
    dataStore.update(storeValue => {
      const selectedHeaders = storeValue.selectedHeaders.includes(header)
        ? storeValue.selectedHeaders.filter(h => h !== header)
        : [...storeValue.selectedHeaders, header];
      return { ...storeValue, selectedHeaders };
    });
  };

  const pageCount = () => {
    let pages;
    dataStore.subscribe(storeValue => {
      pages = Math.ceil(storeValue.selectedHeaders.length / columnsPerPage);
    })();
    return pages;
  };

  const changePage = (offset) => {
    currentPage = Math.min(Math.max(1, currentPage + offset), pageCount());
  };
</script>

<!-- Column Selection -->
<div class="column-selection">
  {#each $dataStore.headers as header}
    <label>
      <input type="checkbox" checked={$dataStore.selectedHeaders.includes(header)} on:change={() => toggleColumn(header)}>
      {header}
    </label>
  {/each}
</div>

<!-- Pagination Controls -->
<div class="pagination-controls">
  <button on:click={() => changePage(-1)} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {pageCount()}</span>
  <button on:click={() => changePage(1)} disabled={currentPage === pageCount()}>Next</button>
</div>

<table>
  <thead>
    <tr>
      {#each $dataStore.selectedHeaders.slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage) as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $dataStore.data as row}
    <tr>
      {#each $dataStore.selectedHeaders.slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage) as header}
        <td>{row[header]}</td>
      {/each}
    </tr>
    {/each}
  </tbody>
</table>

<!-- Pagination Controls -->
<div class="pagination-controls">
  <button on:click={() => changePage(-1)} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {pageCount()}</span>
  <button on:click={() => changePage(1)} disabled={currentPage === pageCount()}>Next</button>
</div>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8em; /* Smaller font size */
  }
  
  th, td {
    border: 1px solid black;
    padding: 4px 8px; /* Less padding */
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tbody {
    display: block; /* Make tbody block to allow scrolling */
    height: 300px; /* Set a fixed height */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  }
  
  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  
  .column-selection {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1em;
  }

  .column-selection label {
    margin-right: 0.5em;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
</style>
