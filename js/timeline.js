var svg_timeline = d3.select("#timeline-svg");
var margin_timeline = { w: document.getElementById("timeline-svg").getBoundingClientRect().width,
                        h: document.getElementById("timeline-svg").getBoundingClientRect().height,
                        left: 10, right: 10}
var w_circleSpace = (margin_timeline.w - margin_timeline.left - margin_timeline.right)/29;
var top_circle = 40;
var dataset_years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

// Colors
var light_gray = d3.rgb(200,200,200);
var dark_gray = d3.rgb(100,100,100);
var lightRed = d3.color("#ff7a73");
var darkRed = d3.color("#510602");
var redRainbow = new Rainbow();
redRainbow.setSpectrum('#510602', '#ff7a73');
redRainbow.setNumberRange(1, 15);

// Create line
svg_timeline.append("line")
            .attr("x1", margin_timeline.left + w_circleSpace/2)
            .attr("x2", margin_timeline.w - margin_timeline.right - w_circleSpace/2)
            .attr("y1", top_circle)
            .attr("y2", top_circle)
            .style("stroke", dark_gray)

// Create groups
svg_timeline.selectAll("timeline_g")
            .data(dataset_years)
            .enter()
            .append("g")
            .attr("class", "timeline_g")

// Create circles
svg_timeline.selectAll(".timeline_g")
            .append("circle")
            .attr("class", "timeline_circle")
            .attr("cx", function(d,i) {
              return margin_timeline.left + w_circleSpace*i + w_circleSpace/2;
            })
            .attr("cy", top_circle)
            .attr("r", 7)
            .style("fill", function(d) {
              if ([1991, 1992, 1993, 1994, 1996, 1997, 1998, 1999, 2001, 2002, 2003, 2004, 2006, 2007].includes(d)) {
                return "white";
              }
              else if (d.PRESENT90=="Yes") {
                return redRainbow.colourAt(1)
              }
              else if (d.PRESENT95=="Yes") {
                return redRainbow.colourAt(2)
              }
              else if (d.PRESENT00=="Yes") {
                return redRainbow.colourAt(3)
              }
              else if (d.PRESENT05=="Yes") {
                return redRainbow.colourAt(4)
              }
              else if (d.PRESENT08=="Yes") {
                return redRainbow.colourAt(5)
              }
              else if (d.PRESENT09=="Yes") {
                return redRainbow.colourAt(6)
              }
              else if (d.PRESENT10=="Yes") {
                return redRainbow.colourAt(7)
              }
              else if (d.PRESENT11=="Yes") {
                return redRainbow.colourAt(8)
              }
              else if (d.PRESENT12=="Yes") {
                return redRainbow.colourAt(9)
              }
              else if (d.PRESENT13=="Yes") {
                return redRainbow.colourAt(10)
              }
              else if (d.PRESENT14=="Yes") {
                return redRainbow.colourAt(11)
              }
              else if (d.PRESENT15=="Yes") {
                return redRainbow.colourAt(12)
              }
              else if (d.PRESENT16=="Yes") {
                return redRainbow.colourAt(13)
              }
              else if (d.PRESENT17=="Yes") {
                return redRainbow.colourAt(14)
              }
              else { return redRainbow.colourAt(15); }
            })
            .style("stroke", function(d) {
              if (d==2018) { return lightRed; }
              else { return dark_gray; }
            });

// Create year labels
svg_timeline.selectAll(".timeline_g")
            .append("text")
            .attr("class", "dataLabel")
            .text(function(d,i) {
              if (i%5==0 | d==2018) {
                return d;
              }
            })
            .attr("x", function(d,i) {
              return margin_timeline.left + w_circleSpace*i + w_circleSpace/2;
            })
            .attr("y", top_circle-20)
            .style("font-weight", function(d) {
              if (d==2018) {
                return 900;
              }
            });

// Updates
var update_timeline = function(currYear) {

  // Figure out year index based on current year
  if (currYear >= 2008) {
    var yearIndex = 15-(2018-currYear);
  }
  else if (currYear==1990) { var yearIndex = 1; }
  else if (currYear==1995) { var yearIndex = 2; }
  else if (currYear==2000) { var yearIndex = 3; }
  else if (currYear==2005) { var yearIndex = 4; }

  // Data labels
  svg_timeline.selectAll(".dataLabel")
              .text(function(d) {
                if (d==currYear) {
                  return d;
                }
              })
              .style("font-weight", function(d) {
                if (d==currYear) { return 900; }
                else { return 400; }
              });

  // Timeline circles
  svg_timeline.selectAll(".timeline_circle")
              .style("fill", function(d) {
                if ([1991, 1992, 1993, 1994, 1996, 1997, 1998, 1999, 2001, 2002, 2003, 2004, 2006, 2007].includes(d)) {
                  return "white";
                }
                else if (d==currYear) { return redRainbow.colourAt(yearIndex); }
                else if (d<currYear) { return darkRed; }
                else { return dark_gray; }
              })
              .style("stroke", function(d) {
                if (d==currYear) { return redRainbow.colourAt(yearIndex); }
                else if (d<currYear) { return darkRed; }
                else { return dark_gray; }
              });

  // Paths
  d3_features.style("fill", function(d) {
                var varName = "PRESENT"+currYear.toString().substring(2);
                if (d.properties[varName] == "Yes") {

                  // Color all past ones dark and the new ones as light
                  if (d.properties['firstYearOpened']==varName) {
                    return lightRed;
                  }
                  else { return darkRed; }

                  // Color by each year's color
                  /*if (d.properties.PRESENT90=="Yes") {
                    return redRainbow.colourAt(1)
                  }
                  else if (d.properties.PRESENT95=="Yes") {
                    return redRainbow.colourAt(2)
                  }
                  else if (d.properties.PRESENT00=="Yes") {
                    return redRainbow.colourAt(3)
                  }
                  else if (d.properties.PRESENT05=="Yes") {
                    return redRainbow.colourAt(4)
                  }
                  else if (d.properties.PRESENT08=="Yes") {
                    return redRainbow.colourAt(5)
                  }
                  else if (d.properties.PRESENT09=="Yes") {
                    return redRainbow.colourAt(6)
                  }
                  else if (d.properties.PRESENT10=="Yes") {
                    return redRainbow.colourAt(7)
                  }
                  else if (d.properties.PRESENT11=="Yes") {
                    return redRainbow.colourAt(8)
                  }
                  else if (d.properties.PRESENT12=="Yes") {
                    return redRainbow.colourAt(9)
                  }
                  else if (d.properties.PRESENT13=="Yes") {
                    return redRainbow.colourAt(10)
                  }
                  else if (d.properties.PRESENT14=="Yes") {
                    return redRainbow.colourAt(11)
                  }
                  else if (d.properties.PRESENT15=="Yes") {
                    return redRainbow.colourAt(12)
                  }
                  else if (d.properties.PRESENT16=="Yes") {
                    return redRainbow.colourAt(13)
                  }
                  else if (d.properties.PRESENT17=="Yes") {
                    return redRainbow.colourAt(14)
                  }
                  else { return redRainbow.colourAt(15); }*/
                }
                else { return "none"; }
             })

}; // end update timeline function def
