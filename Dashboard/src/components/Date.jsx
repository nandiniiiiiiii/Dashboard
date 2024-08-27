import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../App.css'

function Date({ data, width = 600, height = 300 }) {
    const svgRef = useRef();

    useEffect(() => {
        // Set dimensions and margins
        const margin = { top: 20, right: 20, bottom: 50, left: 100 };

        // Append the svg object to the body of the page
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Extract unique sectors and years
        const sectors = Array.from(new Set(data.map(d => d.sector)));
        const years = Array.from(new Set(data.map(d => d.start_year)));

        // Create a scale for x-axis (years)
        const x = d3.scaleBand()
            .domain(years)
            .range([0, width])
            .padding(0.05);

        // Create a scale for y-axis (sectors)
        const y = d3.scaleBand()
            .domain(sectors)
            .range([height, 0])
            .padding(0.05);

        // Create a color scale
        const color = d3.scaleSequential(d3.interpolateBlues)
            .domain([0, d3.max(data, d => d.count)]);

        // Add x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove();

        // Add y-axis
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(0))
            .select(".domain").remove();

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr('class', 'tooltip')
            .style("position", "absolute")
            .style("background", "#fff")
            .style("padding", "5px 10px")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")

        // Draw rectangles
        svg.selectAll()
            .data(data, d => `${d.sector}:${d.start_year}`)
            .enter()
            .append("rect")
            .attr("x", d => x(d.start_year))
            .attr("y", d => y(d.sector))
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", d => color(d.count))
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", function (event, d) {
                tooltip.transition().duration(200).style("opacity", .9)
                tooltip.html(`Year: ${d.start_year}<br>Sector: ${d.sector}<br>Count: ${d.count}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px")
                    .style("color","black");
                d3.select(this).style("opacity", 1);
            })
            .on("mousemove", function (event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition().duration(500).style("opacity", 0);
                d3.select(this).style("opacity", 0.8);
            });

    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
}

export default Date
