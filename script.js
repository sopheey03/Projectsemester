//Random Dataset
const n = 50;
let dataset = d3.range(n).map(function(d){
    return {'y' : Math.random()};  
});

let tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

//Margin Convention
let margin = {top: 50, right: 50, bottom: 50, left: 50};
let width = 800 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;

//Define scales
let xScale = d3.scaleLinear()
    .domain([0, n-1])
    .range([0, width]);

let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

let line = d3.line()
    .x(function(d, i) {return xScale(i); })
    .y(function(d) {return yScale(d.y); })
    .curve(d3.curveStep);

let svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg.append('path')
    .datum(dataset)     //datum points on one single datapoint
    .attr('class', 'line')
    .attr('d', line);

svg.selectAll(' .dot')
    .data(dataset)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', function(d,i) {return xScale(i); })
    .attr('cy', function(d) {return yScale(d.y); })
    .attr('r', 5)
    .on('mouseover', function(d){
        tooltip.transition()
            .duration(200)
            .style('opacity', 1);
        tooltip.html('Value: ' + d.y)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px');
    })
    .on('mouseout', function(d){
        tooltip.transition()
            .duration(400)
            .style('opacity', 0);
    });

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale));

svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale));