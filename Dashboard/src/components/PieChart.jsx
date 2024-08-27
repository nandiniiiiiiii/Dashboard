import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';

function PieChart({ data, width = 500, height = 500 }) {
    const ref = useRef();
    console.log(data)

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const radius = 300 / 2 - 15; // Slightly reduce radius for better fit

        const pie = d3.pie().value(d => d[1]); // d[1] for value in Object.entries()
        const arc = d3.arc().innerRadius(0).outerRadius(radius);
        const arcHover = d3.arc().innerRadius(0).outerRadius(radius * 1.1); // For hover effect

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pieData = pie(Object.entries(data)); // Use Object.entries here

        svg.attr("width", width).attr("height", height);
        const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

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

        const total = d3.sum(Object.values(data));
        // Add a legend
        const paths = g.selectAll("path")
            .data(pieData)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data[0])) // d.data[0] for key
            .attr("stroke", "#fff")
            .attr("stroke-width", "1px") // Reduced stroke width
            .on("mouseover", function (event, d) {
                d3.select(this).transition().duration(200).attr("d", arcHover);

                const percentage = ((d.data[1] / total) * 100).toFixed(2); // Calculate percentage
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`${percentage}%`)
                    .style("left", `${event.pageX + 5}px`)
                    .style("top", `${event.pageY - 28}px`)
                    .style("color","black");
            })
            .on("mouseout", function (event, d) {
                d3.select(this).transition().duration(200).attr("d", arc);
                tooltip.transition().duration(200).style("opacity", 0);
            });

        // Add a legend with a gap from the chart
        const legendMargin = 400; // Margin to add space between legend and chart
        const legend = svg.append("g")
            .attr("transform", `translate(${legendMargin}, ${height / 200})`); // Adjust legend position with margin

        legend.selectAll("rect")
            .data(Object.entries(data))
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 20)
            .attr("width", 14) // Smaller legend squares
            .attr("height", 14)
            .attr("fill", d => color(d[0]));

        legend.selectAll("text")
            .data(Object.entries(data))
            .enter()
            .append("text")
            .attr("x", 20)
            .attr("y", (d, i) => i * 20 + 12)
            .style("font-size", "10px") // Smaller font size
            .text(d => d[0]);


    }, [data]);

    return (
        <svg ref={ref}></svg>   
    );
};


export default PieChart
