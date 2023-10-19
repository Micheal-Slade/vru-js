<script>
    import { onMount } from 'svelte';
    import { dataStore } from '../store/store.js';
    import * as d3 from 'd3';
  
    let selectedVariable = 'IMD_Rank';  // Default variable
  
    const updateChart = () => {
      dataStore.subscribe(({ data }) => {
        // Set the dimensions and margins of the graph
        const margin = {top: 20, right: 30, bottom: 40, left: 90},
              width = 800 - margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;
  
        // Select the svg area
        d3.select("#bar-chart-svg").html("");
  
        // Append SVG
        const svg = d3.select("#bar-chart-svg")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
  
        // X axis
        const x = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[selectedVariable])])
          .nice()
          .range([0, width]);
  
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
  
        // Y axis
        const y = d3.scaleBand()
          .range([0, height])
          .domain(data.map(d => d.LAD22NM))
          .padding(.1);
  
        svg.append("g")
          .call(d3.axisLeft(y));
  
        // Bars
        svg.selectAll("myRect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", x(0) )
          .attr("y", d => y(d.LAD22NM))
          .attr("width", d => x(d[selectedVariable]))
          .attr("height", y.bandwidth() )
          .attr("fill", "#69b3a2");
      })();
    };
  
    const onVariableChange = (event) => {
      selectedVariable = event.target.value;
      updateChart();
    };
  
    onMount(updateChart);
  </script>
  
  <!-- Search Function -->
  <select on:change={onVariableChange}>
    <option value="IMD_Rank">IMD Rank</option>
    <!-- Add other options here for each variable you want to make selectable -->
    {#each $dataStore.headers as header}
      <option value={header}>{header}</option>
    {/each}
  </select>
  
  <div id="bar-chart-svg"></div>
  