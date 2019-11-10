document.addEventListener("DOMContentLoaded", function(){
    request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true);
    request.send();
    request.onload = function(){
        const dataset = JSON.parse(request.responseText);

        const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .attr("class","toolTip");

        const w = 1200, h = 700, padding = 50;

        const svg = d3.select("body").append("svg")
                    .attr("width", w)
                    .attr("height", h)
        
        svg.append("text")
        .attr("x", w/2 - 100)
        .attr("y", 100)      
        .text("Doping in Professional Bicycle Racing")
        .attr("id", "title")
       .attr("class","title-text") ; 
       
       svg.append("text")
       .attr("x", w/2 )
       .attr("y", 130)
       .text("35 Fastest times up Alpe d'Huez")
       .attr("class", "sub-heading")

       const minVal = d3.min(dataset, (d) => d["Year"]);
       const maxVal = d3.max(dataset, (d) => d["Year"]);
       const x_domain_low =  minVal - minVal % 4
       const x_domain_high =  maxVal;

       const x_scale = d3.scaleLinear()
                        .domain([x_domain_low,x_domain_high])
                        .range([padding, w - padding]);

        const calc_yScale = function(d){
           return Date.UTC(1971, 0 , 1, 0, parseInt(d["Time"].split(":")[0]), parseInt(d["Time"].split(":")[1]));
         }                
       
        const low_date =  d3.max(dataset,(d) => calc_yScale(d)); 
        const high_date = d3.min(dataset, (d) => calc_yScale(d));              
        const y_domain_low = low_date
        const y_domain_high = high_date

       const y_scale = d3.scaleLinear()
                        .domain([y_domain_low, y_domain_high])
                        .range([h - padding, padding]);
       
        const calcXTickValues = function(){
            tickValues = []
            for(let x = minVal; x < maxVal; x += 2){
                tickValues.push(x);
            } 
            tickValues.push(maxVal);
            return tickValues;
        }

        const calcYTickValues = function(){
            let tickValues = [];
            let x = y_domain_low - 5000 ;
            for( x; x > y_domain_high; x -= 15000)
                tickValues.push(x);
            tickValues.push(y_domain_high);
            return tickValues;    
        }

        const toolTipData = function(d){
            return `${d["Name"]}: ${d["Nationality"]}<br>Year: ${d["Year"]}, Time: ${d["Time"]}<br><br>${d["Doping"]}`;
        }
              
        const x_axis = d3.axisBottom()
                        .scale(x_scale)
                        .tickFormat(d3.format("d"))
                        .tickValues(calcXTickValues());
                        
                    
        const y_axis = d3.axisLeft().scale(y_scale)
                        .tickFormat(d3.utcFormat("%M:%S"))
                        .tickValues(calcYTickValues());

       svg.append("g")
       .attr("id", "x-axis")
       .call(x_axis)
       .attr("transform", `translate(0, ${h - padding})`);        
       
       svg.append("g")
       .attr("id", "y-axis")
       .call(y_axis)
       .attr("transform", `translate(${padding}, 0)`);

       svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d) => x_scale(d["Year"]))
       .attr("cy", (d) => y_scale(calc_yScale(d)))
       .attr("r", 8)
       .attr("class", "dot")
       .attr("data-xvalue", (d) => d["Year"])
       .attr("data-yvalue", (d) => d3.utcFormat("%M:%S")(calc_yScale(d)))
       .attr("fill", (d) => (d["Doping"] === "")? "rgb(255, 127, 14)": "rgb(31, 119, 180)")
       .on("mouseenter", (d) => {
           tooltip.html(toolTipData(d))
           .attr("data-year", d["Year"])
           .style("visibility", "visible")
           .style("left", (d3.event.pageX + 10) + "px")
           .style("top", (d3.event.pageY - 40) + "px");
       })
       .on("mouseleave", (d) => {
           tooltip.style("visibility", "hidden")
       });

       const legend = svg.append("g")
       .attr("x",900 )
       .attr("y", 400)
       .attr("class", "legend")
       .attr("id", "legend")
       .style("font-size", ".8rem");

       legend.append("text")
       .attr("x", 1030)
       .attr("y", 300)
       .text("No doping allegations");

       legend.append("rect")
       .attr("x", 1150)
       .attr("y", 285)
       .attr("width", 40)
       .attr("height", 20)
       .attr("fill", "rgb(255, 127, 14)");

       legend.append("text")
       .attr("x", 985)
       .attr("y", 330)
       .text("Riders with doping allegations");

       legend.append("rect")
       .attr("x", 1150)
       .attr("y", 315)
       .attr("width", 40)
       .attr("height", 20)
       .attr("fill", "rgb(31, 119, 180)");

    }
})