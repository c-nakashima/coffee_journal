// acidity and body data
let acid_body_data = [];
for(i=0; i<dataset.length; i++){
  let acid_body = [
    dataset[i].acidity,
    dataset[i].body
  ]
  acid_body_data.push(acid_body);
}

// taste_graphの描画

//1. データの準備
let width = 130;
let height = 130;

let margin = {"top": 30, "bottom": 60, "right": 30, "left": 60};
// console.log((width - margin.right - margin.left)/ 2 + margin.left/2);
// let xcenter = (width - margin.right - margin.left)/ 2 + margin.left;
// let ycenter = (height - margin.top - margin.bottom)/2 + margin.top;
// console.log(xcenter, ycenter);

// 2. SVG領域の設定
let svg = d3.select('#taste_graph')
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  // 3. 軸スケールの設定
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(acid_body_data, function(d) { return d[0]; })])
    .range([margin.left, width - margin.right]);
console.log(d3.max(acid_body_data, function(d) { return d[0]; }));

    console.log(d3.max(acid_body_data, function(d) { return d[1]; }))
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(acid_body_data, function(d) { return d[1]; })])
    .range([height - margin.bottom, margin.top]);

  // 4. 軸の表示
  var axisx = d3.axisBottom(xScale).ticks(5);
  var axisy = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (height - margin.bottom) + ")")
    .call(axisx)
    .append("text")
    .attr("fill", "#595757")
    .attr("x", (width - margin.left - margin.right) / 2 + margin.left)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "6px")
    .attr("font-weight", "500")
    .attr("font-family", "Montseratt")
    .text("acidity");

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .call(axisy)
    .append("text")
    .attr("fill", "#595757")
    .attr("x", -(height - margin.top - margin.bottom) / 2 - margin.top)
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .attr("font-weight", "500")
    .attr("font-size", "6px")
    .attr("font-family", "Montseratt")
    .text("body");

  // 5. プロットの表示
  svg.append("g")
    .selectAll("circle")
    .data(acid_body_data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d[0]); })
    .attr("cy", function(d) { return yScale(d[1]); })
    .attr("fill", "#ddd0cb")
    .attr("r", 2);