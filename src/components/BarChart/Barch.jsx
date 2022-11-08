import React from 'react';
import * as d3 from 'd3';
class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [200, 300, 400, 500];
  }
  componentDidMount() {
    let size = 500;
    let svg = d3
      .select(this.myRef.current)
      .append('svg')
      .attr('width', size)
      .attr('height', 400);
    let rect_width = 95;
    svg
      .selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => 5 + i * (rect_width + 5))
      .attr('y', (d) => size - d)
      .attr('width', rect_width)
      .attr('height', (d) => d)
      .attr('fill', 'teal');
    svg
      .selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => 5 + i * (rect_width))
      .attr('y', (d) => size - d);
  }
  render() {
    return <div ref={this.myRef}></div>;
  }
}
export default Bar;
