<script>
  import { onMount } from 'svelte';
  import Papa from 'papaparse';

  let tableData = [];
  let headers = [];

  onMount(async () => {
      const response = await fetch('/data.csv');
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true, dynamicTyping: true });
      headers = parsedData.meta.fields;
      tableData = parsedData.data;
  });
</script>

<table>
  <thead>
      <tr>
          {#each headers as header}
              <th>{header}</th>
          {/each}
      </tr>
  </thead>
  <tbody>
      {#each tableData as row}
          <tr>
              {#each headers as header}
                  <td>{row[header]}</td>
              {/each}
          </tr>
      {/each}
  </tbody>
</table>
