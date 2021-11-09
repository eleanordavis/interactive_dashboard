import * as d3 from "d3";

//title,xTitle,yTitle are strings for the labels for the graph, x and y axis
var createLabelsBar1 = function (
  screen,
  margins,
  graph,
  target,
  title,
  xtitle,
  ytitle
) {
  var labels = d3.select(target).append("g").classed("labels", true);

  labels
    .append("text")
    .text("Number of Grants per Congressional District")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", margins.top / 2);

  labels
    .append("text")
    .text("Congressional District")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", screen.height - 10);

  labels
    .append("g")
    .attr("transform", "translate(20," + (margins.top + graph.height / 2) + ")")
    .append("text")
    .text("Number of Grants")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)");
};

var createAxesBar1 = function (
  screen,
  margins,
  graph,
  target,
  districtScale,
  numberScale
) {
  var xAxis = d3.axisBottom(districtScale);
  var yAxis = d3.axisLeft(numberScale).ticks(6);

  var axes = d3.select(target).append("g").classed("axes", true);
  var xGroup = axes
    .append("g")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (margins.top + graph.height) + ")"
    )
    .call(xAxis)
    .classed("xaxis", true);

  axes
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis)
    .classed("yaxis", true);
};

/*
childless is an array of age categories and the percentage of women childless 
target is a string selector to indicate which svg to put things into

*/
var initGraphsBar1 = function (grants, target) {
  var screen = { width: 700, height: 350 };

  //how much space will be on each side of the graph
  var margins = { top: 80, bottom: 70, left: 90, right: 40 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  //set the screen size
  d3.select(target).attr("width", screen.width).attr("height", screen.height);

  //create a group for the graph
  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  //Need to create scales here
  var getDistricts = function (grant) {
    return grant.district;
  };
  var districts = grants.map(getDistricts);
  var districtScale = d3
    .scaleBand()
    .domain(districts)
    .range([0, graph.width])
    .padding(0.2);

  var minNumber = d3.min(grants, function (grant) {
    return grant.count;
  });
  var maxNumber = d3.max(grants, function (grant) {
    return grant.count;
  });
  var numberScale = d3
    .scaleLinear()
    .domain([600, 6000])
    .range([graph.height, 0])
    .nice();

  //while these function are already written the parameters might not be properly set
  //be sure to read what they want and provide it in the parameters.
  createLabelsBar1(screen, margins, graph, target, "title", "xaxis", "yaxis");
  createAxesBar1(screen, margins, graph, target, districtScale, numberScale);
  drawBarChartBar1(grants, districtScale, numberScale, "#Bar1", graph);
};

var drawBarChartBar1 = function (
  grants,
  districtScale,
  numberScale,
  target,
  graph
) {
  var rects = d3
    .select(target)
    .select(".graph")
    .selectAll("rect")
    .data(grants)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (grant) {
      return districtScale(grant.district);
    })
    .attr("width", function (grant) {
      return districtScale.bandwidth();
    })
    .attr("y", function (grant) {
      return numberScale(grant.count);
    })
    .attr("height", function (grant) {
      return graph.height - numberScale(grant.count);
    })
    .style("fill", "dodgerblue")
    .style("stroke", "black")
    .on("mouseover", makeToolTipBar1)
    .on("mouseleave", hideToolTipBar1);

  /* var newNames = d3
    .select(target)
    .select(".graph")
    .selectAll("text")
    .data(grants)
    .enter()
    .append("text")
    .text(function (grant) {
      return grant.count;
    })
    .attr("x", function (grant) {
      return districtScale(grant.district);
    })
    .attr("y", function (grant) {
      return numberScale(grant.count) - 4;
    });*/
};
var succFCNBar1 = function (grants) {
  console.log("yes", grants);
  initGraphsBar1(grants, "#Bar1");
};
var failFCNBar1 = function (error) {
  console.log("Error", error);
};

var pivotTablePromiseBar1 = d3.csv("data/districts.csv");
pivotTablePromiseBar1.then(succFCNBar1, failFCNBar1);

var makeToolTipBar1 = function (eventData, grant) {
  console.log("yes");

  d3.select("#toolTip").remove();
  d3.select("body").append("div").attr("id", "toolTip");

  var xPosition = eventData.pageX;
  var yPosition = eventData.pageY;

  var base = d3
    .select("#toolTip")
    .classed("hidden", false)
    .style("top", yPosition + "px")
    .style("left", xPosition + "px")
    .append("div");

  base.classed("Title", true).text(grant.count + " " + "total grants");
};

var hideToolTipBar1 = function (eventData, grants) {
  d3.select("#toolTip").classed("hidden", true);
};

var createLabelsBar2 = function (
  screen,
  margins,
  graph,
  target,
  title,
  xtitle,
  ytitle
) {
  var labels = d3.select(target).append("g").classed("labels", true);

  labels
    .append("text")
    .text("Number of Grants per County")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", margins.top / 2);

  labels
    .append("text")
    .text("County")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", screen.height - 10);

  labels
    .append("g")
    .attr("transform", "translate(20," + (margins.top + graph.height / 2) + ")")
    .append("text")
    .text("Number of Grants")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)");
};

var createAxesBar2 = function (
  screen,
  margins,
  graph,
  target,
  countyScale,
  numberScale
) {
  var xAxis = d3.axisBottom(countyScale);
  var yAxis = d3.axisLeft(numberScale).ticks(10);

  var axes = d3.select(target).append("g").classed("axes", true);
  var xGroup = axes
    .append("g")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (margins.top + graph.height) + ")"
    )
    .call(xAxis)
    .classed("xaxis", true);

  axes
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis)
    .classed("yaxis", true);

  xGroup
    .selectAll("text")
    .attr("text-anchor", "start")
    .attr("transform", "translate(5,0) rotate(45)");
};

/*
childless is an array of age categories and the percentage of women childless 
target is a string selector to indicate which svg to put things into

*/
var initGraphsBar2 = function (grants, target) {
  //the size of the screen
  var screen = { width: 700, height: 350 };

  //how much space will be on each side of the graph
  var margins = { top: 80, bottom: 70, left: 90, right: 40 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  //set the screen size
  d3.select(target).attr("width", screen.width).attr("height", screen.height);

  //create a group for the graph
  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  //Need to create scales here
  var getCounties = function (grant) {
    return grant.county;
  };
  var counties = grants.map(getCounties);
  var countyScale = d3
    .scaleBand()
    .domain(counties)
    .range([0, graph.width])
    .padding(0.2);

  var minNumber = d3.min(grants, function (grant) {
    return grant.count;
  });
  var maxNumber = d3.max(grants, function (grant) {
    return grant.count;
  });
  var numberScale = d3
    .scaleLinear()
    .domain([80, 4000])
    .range([graph.height, 0])
    .nice();

  //while these function are already written the parameters might not be properly set
  //be sure to read what they want and provide it in the parameters.
  createLabelsBar2(screen, margins, graph, target, "title", "xaxis", "yaxis");
  createAxesBar2(screen, margins, graph, target, countyScale, numberScale);
  drawBarChartBar2(grants, countyScale, numberScale, "#Bar2", graph);
};

var drawBarChartBar2 = function (
  grants,
  countyScale,
  numberScale,
  target,
  graph
) {
  var rects = d3
    .select(target)
    .select(".graph")
    .selectAll("rect")
    .data(grants)
    .enter()
    .append("rect")
    .attr("x", function (grant) {
      return countyScale(grant.county);
    })
    .attr("width", function (grant) {
      return countyScale.bandwidth();
    })
    .attr("y", function (grant) {
      return numberScale(grant.count);
    })
    .attr("height", function (grant) {
      return graph.height - numberScale(grant.count);
    })
    .style("fill", "salmon")
    .style("stroke", "black")
    .on("mouseover", makeToolTipBar2)
    .on("mouseleave", hideToolTipBar2);

  /*var newNames = d3
    .select(target)
    .select(".graph")
    .selectAll("text")
    .data(grants)
    .enter()
    .append("text")
    .text(function (grant) {
      return grant.count;
    })
    .attr("x", function (grant) {
      return countyScale(grant.county);
    })
    .attr("y", function (grant) {
      return numberScale(grant.count) - 4;
    });*/
};
var succFCNBar2 = function (grants) {
  console.log("women", grants);
  initGraphsBar2(grants, "#Bar2");
};
var failFCNBar2 = function (error) {
  console.log("Error", error);
};

//var grantPromise = d3.csv("data/finalData.csv");
var pivotTablePromiseBar2 = d3.csv("data/counties.csv");
//var promises = [grantPromise, pivotTablePromise];
pivotTablePromiseBar2.then(succFCNBar2, failFCNBar2);

var makeToolTipBar2 = function (eventData, grant) {
  console.log("yes");

  d3.select("#toolTip").remove();
  d3.select("body").append("div").attr("id", "toolTip");

  var xPosition = eventData.pageX;
  var yPosition = eventData.pageY;

  var base = d3
    .select("#toolTip")
    .classed("hidden", false)
    .style("top", yPosition + "px")
    .style("left", xPosition + "px")
    .append("div");

  base.classed("Title", true).text(grant.count + " " + "total grants");
};

var hideToolTipBar2 = function (eventData, grants) {
  var list = d3.select("#toolTip").classed("hidden", true);
};

var succFCNLine = function (grants) {
  console.log("Success", grants);
  initGraphsLine(grants, "#Line");
};
var failFCNLine = function (error) {
  console.log("Fail", error);
};
var grantPromiseLine = d3.csv("data/months.csv");
grantPromiseLine.then(succFCNLine, failFCNLine);

var createLabelsLine = function (
  screen,
  margins,
  graph,
  target,
  title,
  xtitle,
  ytitle
) {
  var labels = d3.select(target).append("g").classed("labels", true);

  labels
    .append("text")
    .text("Count of Grants Awarded Over Time")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", margins.top / 2);

  labels
    .append("text")
    .text("Month")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", screen.height - 10);

  labels
    .append("g")
    .attr("transform", "translate(20," + (margins.top + graph.height / 2) + ")")
    .append("text")
    .text("Count of Grants")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)");
};

var createAxesLine = function (
  screen,
  margins,
  graph,
  target,
  timeScale,
  amountScale
) {
  var xAxis = d3.axisBottom(timeScale);
  var yAxis = d3.axisLeft(amountScale).ticks(6);

  var axes = d3.select(target).append("g").classed("axes", true);
  var xGroup = axes
    .append("g")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (margins.top + graph.height) + ")"
    )
    .call(xAxis)
    .classed("xaxis", true);

  axes
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis)
    .classed("yaxis", true);
};

var initGraphsLine = function (grants, target) {
  //the size of the screen
  var screen = { width: 700, height: 350 };

  //how much space will be on each side of the graph
  var margins = { top: 80, bottom: 70, left: 90, right: 40 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  //set the screen size
  d3.select(target).attr("width", screen.width).attr("height", screen.height);

  //create a group for the graph
  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  //Need to create scales here

  var monthScale = d3.scaleLinear().domain([1, 12]).range([0, graph.width]);

  var amountScale = d3
    .scaleLinear()
    .domain([450, 1600])
    .range([graph.height, 0])
    .nice();

  /*var labelScale = d3.scaleOrdinal(d3.schemeCategory10);*/
  //while these function are already written the parameters might not be properly set
  //be sure to read what they want and provide it in the parameters.
  createLabelsLine(screen, margins, graph, target, "atitle", "xaxis", "yaxis");
  createAxesLine(screen, margins, graph, target, monthScale, amountScale);
  /*drawLegend(graph, margins, genderScale, "svg");*/

  var drawLinesLine = function (monthScale, amountScale, target, grants) {
    var lineGenerator = d3
      .line()
      .x(function (grant) {
        return monthScale(grant.month);
      })
      .y(function (grant) {
        return amountScale(grant.amount);
      })
      .curve(d3.curveCardinal);

    var line = d3
      .select("#Line")
      .select(".graph")
      .append("path")
      .datum(grants)
      .classed("line", true)
      .attr("d", lineGenerator)
      .style("stroke", "crimson")
      .style("fill", "none")
      .style("stroke-width", 3)
      .on("mouseover", makeToolTip)
      .on("mouseleave", hideToolTip);
  };

  var makeToolTip = function (eventData, grant) {
    console.log("yes");

    d3.select("#toolTip").remove();
    d3.select("body").append("div").attr("id", "toolTip");

    var xPosition = eventData.pageX;
    var yPosition = eventData.pageY;

    var base = d3
      .select("#toolTip")
      .classed("hidden", false)
      .style("top", yPosition + "px")
      .style("left", xPosition + "px")
      .append("div");

    base
      .classed("Title", true)
      .text(
        "This is a visualization of how many grants were awarded over one year the pandemic. The raw data is as followed: (1,538),(2,993), (3,780), (4,1000), (5,1001), (6,858), (7,789), (8,1037), (9,1513), (10,457), (11,614), (12,680)"
      );
  };

  var hideToolTip = function (eventData, grants) {
    var list = d3.select("#toolTip").classed("hidden", true);
  };

  drawLinesLine(monthScale, amountScale, "#Line", grants);
};

//title,xTitle,yTitle are strings for the labels for the graph, x and y axis
var createLabelsBar3 = function (
  screen,
  margins,
  graph,
  target,
  xtitle,
  ytitle
) {
  var labels = d3.select(target).append("g").classed("labels", true);

  labels
    .append("text")
    .text("Population per County")
    .classed("title", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", margins.top / 2);

  labels
    .append("text")
    .text("County")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left + graph.width / 2)
    .attr("y", screen.height - 10);

  labels
    .append("g")
    .attr("transform", "translate(20," + (margins.top + graph.height / 2) + ")")
    .append("text")
    .text("Total Population")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)");
};

var createAxesBar3 = function (
  screen,
  margins,
  graph,
  target,
  countyScale,
  numberScale
) {
  var xAxis = d3.axisBottom(countyScale);
  var yAxis = d3.axisLeft(numberScale).ticks(6);

  var axes = d3.select(target).append("g").classed("axes", true);
  var xGroup = axes
    .append("g")
    .attr(
      "transform",
      "translate(" + margins.left + "," + (margins.top + graph.height) + ")"
    )
    .call(xAxis)
    .classed("xaxis", true);

  axes
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
    .call(yAxis)
    .classed("yaxis", true);
};

/*
childless is an array of age categories and the percentage of women childless 
target is a string selector to indicate which svg to put things into

*/
var initGraphsBar3 = function (grants, target) {
  var screen = { width: 700, height: 350 };

  //how much space will be on each side of the graph
  var margins = { top: 80, bottom: 70, left: 90, right: 40 };

  //generated how much space the graph will take up
  var graph = {
    width: screen.width - margins.left - margins.right,
    height: screen.height - margins.top - margins.bottom
  };

  //set the screen size
  d3.select(target).attr("width", screen.width).attr("height", screen.height);

  //create a group for the graph
  var g = d3
    .select(target)
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  //Need to create scales here
  var getCounties = function (grant) {
    return grant.county;
  };
  var counties = grants.map(getCounties);
  var countyScale = d3
    .scaleBand()
    .domain(counties)
    .range([0, graph.width])
    .padding(0.2);

  var minNumber = d3.min(grants, function (grant) {
    return grant.population;
  });
  var maxNumber = d3.max(grants, function (grant) {
    return grant.population;
  });
  var numberScale = d3
    .scaleLinear()
    .domain([35000, 800000])
    .range([graph.height, 0])
    .nice();

  //while these function are already written the parameters might not be properly set
  //be sure to read what they want and provide it in the parameters.
  createLabelsBar3(screen, margins, graph, target, "title", "xaxis", "yaxis");
  createAxesBar3(screen, margins, graph, target, countyScale, numberScale);
  drawBarChartBar3(grants, countyScale, numberScale, "#comparison", graph);
};

var drawBarChartBar3 = function (
  grants,
  countyScale,
  numberScale,
  target,
  graph
) {
  var rects = d3
    .select(target)
    .select(".graph")
    .selectAll("rect")
    .data(grants)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (grant) {
      return countyScale(grant.county);
    })
    .attr("width", function (grant) {
      return countyScale.bandwidth();
    })
    .attr("y", function (grant) {
      return numberScale(grant.population);
    })
    .attr("height", function (grant) {
      return graph.height - numberScale(grant.population);
    })
    .style("fill", "darkorchid")
    .style("stroke", "black")
    .on("mouseover", makeToolTipBar3)
    .on("mouseleave", hideToolTipBar3);

  /* var newNames = d3
    .select(target)
    .select(".graph")
    .selectAll("text")
    .data(grants)
    .enter()
    .append("text")
    .text(function (grant) {
      return grant.count;
    })
    .attr("x", function (grant) {
      return districtScale(grant.district);
    })
    .attr("y", function (grant) {
      return numberScale(grant.count) - 4;
    });*/
};
var succFCNBar3 = function (grants) {
  console.log("yes", grants);
  initGraphsBar3(grants, "#comparison");
};
var failFCNBar3 = function (error) {
  console.log("Error", error);
};

var pivotTablePromiseBar3 = d3.csv("data/FINALDATA.csv");
pivotTablePromiseBar3.then(succFCNBar3, failFCNBar3);

var makeToolTipBar3 = function (eventData, grant) {
  console.log("yes");

  d3.select("#toolTip").remove();
  d3.select("body").append("div").attr("id", "toolTip");

  var xPosition = eventData.pageX;
  var yPosition = eventData.pageY;

  var base = d3
    .select("#toolTip")
    .classed("hidden", false)
    .style("top", yPosition + "px")
    .style("left", xPosition + "px")
    .append("div");

  base.classed("Title", true).text("Population: " + grant.population);
};

var hideToolTipBar3 = function (eventData, grants) {
  d3.select("#toolTip").classed("hidden", true);
};
