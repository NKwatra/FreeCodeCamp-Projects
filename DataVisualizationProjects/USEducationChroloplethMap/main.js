document.addEventListener("DOMContentLoaded", function(){
    request = new XMLHttpRequest();
    request.open("GET","https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json" , true);
    request.send();
    request.onload = function(){
        
    }
})