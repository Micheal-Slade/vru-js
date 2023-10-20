<!-- +layout.svelte -->

<script>
    import FlexTable from "../components/FlexTable.svelte";
    import BarChart from '../components/BarChart.svelte';
  </script>
  
  <!-- Header -->
  <header>
    <div id="svg-container">
      <svg width="100" height="100">
       <img src="/mayoral-logo.svg" alt="Mayor of London" />
      </svg>
    </div>
  </header>
 
  <!-- Main Content -->
  <main>
    <!-- Left Panel -->
  <div id="left-panel">
    <nav>
      <ul>
        <li><a href="/">Overall Trends</a></li>
        <li><a href="/Youth Violence">Youth Violence</a></li>
        <li><a href="/MyEnds">My Ends Program</a></li>
        <!-- ... other navigation links ... -->
      </ul>
    </nav>
    </div>
    
    <!-- Page Content -->
    <div id="page-content">
      <FlexTable />
      <BarChart />
      <slot></slot> <!-- This line will insert the content from +page.svelte -->
    </div>
  </main>
  
  <style>
   #svg-container {
    background-color: #353d42;
   }
  </style>
  