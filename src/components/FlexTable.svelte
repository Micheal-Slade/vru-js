<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';
  
  let data = [];
  let headers = [];
  let selectedHeaders = [];
  let currentPage = 1;
  let columnsPerPage = 5; // Set the number of columns you want per page
  
  onMount(async () => {
    const csvData = await csv("/data.csv");
    data = csvData;
    if (data.length > 0) {
      headers = Object.keys(data[0]);
      selectedHeaders = headers.slice(0, columnsPerPage); // Initialize with the first few columns
    }
  });
  
  const toggleColumn = (header) => {
    if (selectedHeaders.includes(header)) {
      selectedHeaders = selectedHeaders.filter(h => h !== header);
    } else {
      selectedHeaders = [...selectedHeaders, header];
    }
  };
  
  const pageCount = () => Math.ceil(selectedHeaders.length / columnsPerPage);
  
  const changePage = (offset) => {
    currentPage = Math.min(Math.max(1, currentPage + offset), pageCount());
  };
</script>

<!-- Column Selection -->
<div class="column-selection">
  {#each headers as header}
    <label>
      <input type="checkbox" checked={selectedHeaders.includes(header)} on:change={() => toggleColumn(header)}>
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
      {#each selectedHeaders.slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage) as header}
        <th>{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
    <tr>
      {#each selectedHeaders.slice((currentPage - 1) * columnsPerPage, currentPage * columnsPerPage) as header}
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
