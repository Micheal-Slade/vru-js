<!-- +layout.svelte -->

<script>
    import FlexTable from "../components/FlexTable.svelte";
    import BarChart from '../components/BarChart.svelte';
  </script>
  
  <!-- Header -->
  <header>
    <div id="svg-container">
      <!-- TODO: Replace with the SVG of the Mayor of London -->
      <svg width="100" height="100">
        <!-- SVG content -->
      </svg>
    </div>
  </header>
  
  <!-- Main Content -->
  <main>
    <!-- Left Panel -->
    <div id="left-panel">
      <!-- Content for the left panel -->
    </div>
    
    <!-- Page Content -->
    <div id="page-content">
      <FlexTable />
      <BarChart />
      <slot></slot> <!-- This line will insert the content from +page.svelte -->
    </div>
  </main>
  
  <style>
    /* Styling will come later */
  </style>
  