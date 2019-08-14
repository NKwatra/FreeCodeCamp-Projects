document.addEventListener("DOMContentLoaded", function(){
    request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", true);
    request.send();
    request.onload = function(){

        const width = 1600, height= 700, padding= 100;
        const response = JSON.parse(request.responseText);
        const baseTemp = response["baseTemperature"];
        const dataset = response["monthlyVariance"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September"
        , "October", "November", "December"];
        const tempDataColors = ["rgb(49, 54, 149)", "rgb(69, 117, 180)", "rgb(116, 173, 209)", "rgb(171, 217, 233)", "rgb(224, 243, 248)", "rgb(255, 255, 191)", "rgb(254, 224, 144)", "rgb(253, 174, 97)", "rgb(244, 109, 67)", "rgb(215, 48, 39)", "rgb(165, 0, 38)"];
        const tempDataVals = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8]; 

        const findColor = function(data){
            for(let i=0; i< tempDataVals.length; i++)
            {
                if(tempDataVals[i] > data)
                    return tempDataColors[i];
            }
            return tempDataColors[tempDataColors.length - 1];
        }

        const toolTip = d3.select("body")
                        .append("div")
                        .attr("class", "tooltip") 
        
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        svg.append("text")
        .attr("x", width/2 - 3*padding)
        .attr("y", 30)
        .text("Monthly Global Land-Surface Temperature")
        .attr("id", "title")
        .style("font-size", "2rem");  
        
        svg.append("text")
        .attr("x", width/ 2 - 2*padding)
        .attr("y", 60)
        .text("1753 - 2015: base temperature 8.66 °C")
        .attr("id", "description")
        .style("font-size", "1.3rem");

        const xScale = d3.scaleLinear()
                        .domain([d3.min(dataset, (d) => d["year"]), d3.max(dataset, (d) => d["year"])])
                        .range([padding, width - padding]);
                     
        
        const yScale = d3.scaleLinear()
                        .domain([11.5, -0.5])
                        .range([height - padding, padding]);

        const calcXTickValues = function(){
            let tickValues = []
            let minVal = d3.min(dataset, (d) => d["year"]);
            let maxVal = d3.max(dataset, (d) => d["year"]);
            let x = minVal + 10 - minVal % 10;
            for(x; x < maxVal; x+=10)
                tickValues.push(x);
            return tickValues;    
        }    
        
                        
        const xAxis = d3.axisBottom()
                        .scale(xScale)
                        .tickFormat(d3.format("d"))
                        .tickValues(calcXTickValues()); 
       
        const yAxis = d3.axisLeft()
                        .scale(yScale)
                        .tickFormat((d) => (d < 0)? "" : months[d])
                        .tickValues([0,1,2,3,4,5,6,7,8,9,10,11]);
                        
        svg.append("g")
            .call(xAxis)
            .attr("id", "x-axis")
            .attr("transform", `translate(0, ${height - padding} )`)
            .style("font-size", 15);
            
        svg.append("g")
            .call(yAxis)
            .attr("id", "y-axis")
            .attr("transform", `translate(${padding}, 0)`)
            .style("font-size", 10)
            .style("text-transform", "uppercase");
        
        const legend = svg.append("g")
                        .attr("id", "legend")
                        .attr("x", padding)
                        .attr("y", height - padding / 2);
        
        legend.selectAll("rect")
        .data(tempDataColors)
        .enter()
        .append("rect")
        .attr("x", (d,i) => padding + i * 36)
        .attr("y", height-padding/2)
        .attr("width", 36)
        .attr("height", 25)
        .attr("fill", (d,i) => d)
        .style("stroke", "black")
        .style("stroke-width", 2);

        legend.selectAll("text")
        .data(tempDataVals)
        .enter()
        .append("text")
        .attr("x", (d,i) => padding + i * 36 + 25)
        .attr("y", height - padding / 2 + 40)
        .text((d,i) => d.toFixed(1));

        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d["year"]))
        .attr("y", (d) => yScale(d["month"] - 1.5))
        .attr("width", (width - 2*padding) / (d3.max(dataset, (d) => d["year"])-d3.min(dataset, (d) => d["year"])))
        .attr("height", (height - 2*padding) / 12)
        .attr("class", "cell")
        .attr("data-month", (d) => d["month"] - 1)
        .attr("data-year", (d) => d["year"])
        .attr("data-temp", (d) => baseTemp + d["variance"])
        .attr("fill", (d) => findColor(baseTemp + d["variance"]))
        .on("mouseenter", (d) => {
            toolTip.attr("id", "tooltip")
            .attr("data-year", d["year"])
            .style("left", d3.event.pageX + 20 + "px")
            .style("top", d3.event.pageY - 20 + "px")
            .style("visibility", "visible")
            .html(`${d["year"]} - ${months[d["month"] - 1]}<br>${(baseTemp + d["variance"]).toFixed(1)}°C<br>${d["variance"].toFixed(1)}°C`)
        })
        .on("mouseout", () => {
            toolTip.style("visibility", "hidden")});


    }
})