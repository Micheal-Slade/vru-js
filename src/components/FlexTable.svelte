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
  table, th, td {
    border: 1px solid;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  
  table.blueTable, table {
    border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  table.blueTable td, table.blueTable th, td, th {
    border: 1px solid #AAAAAA;
    padding: 3px 2px;
  }
  table.blueTable tbody td, tbody td {
    font-size: 13px;
  }
  table.blueTable tr:nth-child(even), tr:nth-child(even) {
    background: #D0E4F5;
  }
  table.blueTable thead, thead {
    background: #1C6EA4;
    background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
    border-bottom: 2px solid #444444;
  }
  table.blueTable thead th, thead th {
    font-size: 15px;
    font-weight: bold;
    color: #FFFFFF;
    border-left: 2px solid #D0E4F5;
  }
  table.blueTable thead th:first-child, thead th:first-child {
    border-left: none;
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
    table-layout: fixed; /* This keeps the table layout fixed regardless of content */
  }
  
  thead th {
    position: sticky;
    top: 0; /* This keeps the headers at the top of the container as you scroll */
    background-color: #1C6EA4; /* This ensures the background color covers the content behind it */
  }
  
  th, td {
    width: 60%; /* This sets a fixed width to ensure alignment; adjust the percentage as needed */
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