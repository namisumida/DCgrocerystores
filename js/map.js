var w = 800;
var h = 800;
var dataset;

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
var d3_features;


d3.json("Data/Grocery_Store_Locations.json", function(geoShape) {

  dataset = geoShape;
  addLmaps();

  // Draw features
  var svg = d3.select("#map-container").select("svg")
              .attr("pointer-events", "auto")
  var g = svg.append("g");
  var projection = d3.geoTransform({ point: projectPoint });
  var path = d3.geoPath().projection(projection);
  d3_features = g.selectAll("points")
                    	.data(dataset.features)
                    	.enter()
                      .append("path")
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
                      })

   function update() {
     d3_features.attr("d", path);
   };
   dcMap.on("moveend", update);
   update();

  // fit the SVG element to leaflet's map layer
  function reset() {
    bounds = path.bounds(geoShape);
    var topLeft = bounds[0]
    var bottomRight = bounds[1];

    svg.attr("width", bottomRight[0] - topLeft[0])
       .attr("height", bottomRight[1] - topLeft[1])
       .style("left", topLeft[0] + "px")
       .style("top", topLeft[1] + "px");

    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    // initialize the path data
    d3_features.attr("d", path)
               .style("fill-opacity", 0.7)
               .attr('fill','blue');
  };
	dcMap.on("viewreset", reset);
	reset();

})
