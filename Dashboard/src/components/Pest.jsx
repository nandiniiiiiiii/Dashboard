import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Pest({ data, width = 800, height = 370 }) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(data.map(d => d.pestle))
            .range([0, chartWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .nice()
            .range([chartHeight, 0]);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        svg.attr("width", width)
            .attr("height", height);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.pestle))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => chartHeight - y(d.count))
            .attr("fill", d => color(d.pestle))
            .on("mouseover", function (event, d) {
                d3.select(this).transition().duration(200).attr("fill", "orange");
            })
            .on("mouseout", function (event, d) {
                d3.select(this).transition().duration(200).attr("fill", color(d.pestle));
            });

        g.selectAll(".label")
            .data(data)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => x(d.pestle) + x.bandwidth() / 2)
            .attr("y", d => y(d.count) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.count);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + chartWidth / 2)
            .attr("y", height)
            .text("Pestle");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${margin.left /2},${margin.top + chartHeight / 2}) rotate(-90)`)
            .text("Count");

    }, [data]);

    return <svg ref={ref}></svg>;
}

export default Pest
