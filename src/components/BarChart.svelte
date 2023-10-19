<script>
    import { onMount } from 'svelte';
    import { dataStore, fetchData } from '../store/store.js';
    import * as d3 from 'd3';
  
    let selectedVariable = '';
    
    const updateChart = () => {
      const margin = { top: 20, right: 30, bottom: 40, left: 90 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
  
      // append the svg object to the body of the page
      const svg = d3.select("#bar-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      dataStore.subscribe(storeValue => {
        const data = storeValue.data.map(d => ({ name: d.LAD22NM, value: +d[selectedVariable] }));
  
        // X axis
        const x = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .nice()
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
  
        // Y axis
        const y = d3.scaleBand()
          .range([height, 0])
          .domain(data.map(d => d.name))
          .padding(.1);
        svg.append("g")
          .call(d3.axisLeft(y))
          .selectAll("text")
            .attr("dy", null);
  
        // Bars
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
            .attr("x", x(0))
            .attr("y", d => y(d.name))
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");
      })();
    };
  
    onMount(updateChart);
  </script>
  
  <!-- Dropdown for variable selection -->
  <div>
    <select bind:value={selectedVariable} on:change={updateChart}>
      <option disabled selected value=""> -- select a variable -- </option>
      <!-- Listing all variables except the location identifiers -->
      <option>IMD</option>
      <option>Teenage Deliveries</option>
      <option>Children in Care</option>
      <!-- ... add all other variables here ... -->
    </select>
  </div>
  
  <!-- SVG element for the bar chart -->
  <svg id="bar-chart"></svg>
  
  <style>
    #bar-chart {
      display: block;
      margin: auto;
    }
  </style>
  