// Data
var dataset, subset;
// Add columns like when it first opened and if it closed
var addColumns = function(data) {
  var yearVars = ['PRESENT90', 'PRESENT95', 'PRESENT00', 'PRESENT05', 'PRESENT08', 'PRESENT09', 'PRESENT10', 'PRESENT11', 'PRESENT12', 'PRESENT13', 'PRESENT14', 'PRESENT15', 'PRESENT16', 'PRESENT17', 'PRESENT18']
  for (var i=0; i<data.features.length; i++) {
    var currRow = data.features[i].properties
    var firstYear = true;
    for (var y=0; y<yearVars.length; y++) {
      var yearVar = yearVars[y];
      if (currRow[yearVar]=="Yes") {
        data.features[i].properties['lastYearOpened'] = yearVars[y];
        if (firstYear) {
          data.features[i].properties['firstYearOpened'] = yearVars[y];
        }
        firstYear = false;
      }
    }
  } // end for loop
  return data;
}; // end addcolumns function

// SVG specific
var w = 800;
var h = 800;
var svg, path, g, projection, d3_features;

// Get data
d3.json("Data/Grocery_Store_Locations.json", function(geoShape) {

  dataset = addColumns(geoShape);
  addLmaps();

  // Draw svg & paths
  svg = d3.select("#map-container")
          .select("svg")
          .attr("pointer-events", "auto");
  g = svg.append("g");
  projection = d3.geoTransform({ point: projectPoint });
  path = d3.geoPath().projection(projection);

  // Create paths
  d3_features = g.selectAll("points")
                	.data(dataset.features)
                	.enter()
                  .append("path")
                  .attr("d", path)
                  .filter(function(d) {
                    return d.properties['PRESENT18'] == "Yes";
                  })
                  .style("fill", function(d) {
                    if (d.properties.PRESENT90=="Yes") {
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
                    else { return redRainbow.colourAt(15); }
                  });

  svg.selectAll("circle")
     .data(dataset.features)
     .enter()
     .append("circle")
     .attr('cx', function(d) {
       return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
     })
     .attr("cy", function(d) {
       return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
     })
     .attr("r", 5);

  //dcMap.on("moveend", updatePaths); // zooming
  //dcMap.on("drag", updatePaths);
  //dcMap.on("viewreset", reset);

  // Update when clicking years
  svg_timeline.selectAll(".timeline_g").on("mouseover", function(d) {
    // Only update if it's one of the years that we have data for
    if (![1991, 1992, 1993, 1994, 1996, 1997, 1998, 1999, 2001, 2002, 2003, 2004, 2006, 2007].includes(d)) {
      updateTimeline(d);
      updateDots(d);
    }
  });

})
// Update functions
function dragging(d) {
  var offset = projection.translate(); // get current (pre-dragging) translation offset
  offset[0] += d3.event.dx; // augment offset, following mouse movement
  offset[1] += d3.event.dy;
  projection.translate(offset); // update projection with new offset

}; // end dragging
// Update paths
function updateDots(currYear) {
  // Paths
  if (currYear==2018) {
    d3_features.style("fill", function(d,i) {
                  // Color by each year's color
                  if (d.properties.PRESENT90=="Yes") {
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
                  else { return redRainbow.colourAt(15); }
                });
    }
    else {
      d3_features.style("fill", function(d) {
                    var varName = "PRESENT"+currYear.toString().substring(2);
                    if (d.properties[varName] == "Yes") {
                      // Color all past ones dark and the new ones as light
                      if (d.properties['firstYearOpened']==varName) {
                        return lightRed;
                      }
                      else { return darkRed; }
                    }
                    else { return "none"; }
                 })
    }
}; // end update path
// Create leaflet map
function addLmaps() {
  dcMap = L.map('map-container').setView([38.91, -77.04], 13);
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
              subdomains: 'abcd',
              maxZoom: 19
          }).addTo(dcMap);

  L.svg({clickable:true}).addTo(dcMap);
};
// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
  var point = dcMap.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
};
