document.addEventListener('DOMContentLoaded', function () {
    request = new XMLHttpRequest();
    request.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    request.send();
    request.onload = function () {
        const response = JSON.parse(request.responseText);
        const dataset = response.data;
        const padding = 50
        const w = 1200;
        const rect_width = (w - 2 * padding) / dataset.length;
        const h = 700;

        const toolTip = d3.select("body").append("div")
            .attr("class", "tool-tip")
            .attr("id", "tooltip");

        var svg = d3.select('body').append("svg")
            .attr("width", w).attr("height", h);

        var xScale = d3.scaleLinear()
            .domain([0, dataset.length - 1])
            .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([h - padding, padding]);

        const base_date = new Date(dataset[0][0]);
        var calcScale = function (date) {
            const curr_date = new Date(date);
            return ((curr_date.getFullYear() - base_date.getFullYear()) * 4 + (curr_date.getMonth() - base_date.getMonth()) / 3);
        }

        var generateTickValues = function () {
            first_value = (5 - base_date.getFullYear() % 5) * 4 - (base_date.getMonth() / 3);
            tickValues = []
            for (var x = first_value; x <= dataset.length; x += 20)
                tickValues.push(x);
            console.log(tickValues);
            return tickValues;
        }

        var x_axis = d3.axisBottom().scale(xScale).tickValues(generateTickValues()).tickFormat((d) => base_date.getFullYear() + d/ 4);
        var y_axis = d3.axisLeft().scale(yScale);
        const xAxisTranslate = h - padding;


        var toolTipText = function (d) {
            date = new Date(d[0]);
            let year = date.getFullYear();
            let quarter = Math.floor(date.getMonth() / 3) + 1;
            return year + " " + "Q" + quarter + "<br>" + "$" + d[1] + " Billion";
        }

        const rotation_pivot_x = padding + 20;
        const rotation_pivot_y = padding + 180; 

        svg.append("text")
        .text("Gross Domestic Product")
        .attr("x", rotation_pivot_x)
        .attr("y", rotation_pivot_y)
        .attr("transform", "rotate(-90," + rotation_pivot_x + ", " + rotation_pivot_y+ ")");   

        svg.append("text")
            .attr("id", "title")
            .attr("x", w / 2 - 200)
            .attr("y", padding)
            .attr("class", "heading")
            .text("United States GDP");

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(calcScale(d[0])))
            .attr("y", (d, i) => yScale(d[1]))
            .attr("width", rect_width)
            .attr("height", (d) => h - yScale(d[1]) - padding)
            .attr("fill", "rgb(51, 173, 255)")
            .attr("class", "bar")
            .attr("data-date", (d) => d[0])
            .attr("data-gdp", (d) => d[1])
            .on("mouseover", (d) => {
                toolTip.html(toolTipText(d))
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", 600 + "px")
                    .attr("data-date", d[0])
                    .style("visibility", "visible");
            })
            .on("mouseout", (d) =>{
                toolTip.style("visibility", "hidden");
            });

        svg.append("g").call(x_axis)
            .attr("transform", "translate(0, " + xAxisTranslate + ")")
            .attr("id", "x-axis");
        svg.append("g").call(y_axis)
            .attr("transform", "translate(" + padding + ", 0)")
            .attr("id", "y-axis"); 

    };
});