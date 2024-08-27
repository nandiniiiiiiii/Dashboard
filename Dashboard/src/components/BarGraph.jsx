import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { brown } from '@mui/material/colors';

function BarGraph({ data, width = 400, height = 455 }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = 300;

    const x = d3.scaleBand()
      .domain(data.map(d => d.sector))
      .range([0, chartWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .nice()
      .range([chartHeight, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("border", "1px solid #ddd")
      .style("padding", "5px")
      .style("border-radius", "3px")
      .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("dx", "-1em")
      .attr("dy", "-0.5em");

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(y));

    // Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.sector))
      .attr("y", d => y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("height", d => chartHeight - y(d.intensity))
      .attr("fill", d => color(d.sector))
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("fill", d3.rgb(color(d.sector)).darker(2));

        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.sector}</strong><br>Intensity: ${d.intensity}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`)
          .style("color","black");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).transition().duration(200).attr("fill", color(d.sector));
        tooltip.transition().duration(200).style("opacity", 0);
      });

      svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + chartWidth / 2)
            .attr("y", height)
            .text("Pestle");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${margin.left - 80/2},${margin.top + chartHeight / 2}) rotate(-90)`)
            .text("Count");

    return () => {
      tooltip.remove(); // Clean up tooltip when component unmounts
    };
  }, [data]);

  return <svg ref={ref} ></svg>;

}

export default BarGraph
