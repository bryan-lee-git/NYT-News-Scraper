// Built by LucyBot. www.lucybot.com

var userSearch = {
    searchTerm: "",
    numRecords: "",
    startYear: "",
    endYear: ""
}

function fillObject(object) {
    object.searchTerm = $("#searchForm").val();
    object.numRecords = $("#records").val();
    object.startYear = $("#startYear").val() + "0101";
    object.endYear = $("#endYear").val() + "0101";
}

$("#nyt-form").submit(function(e) {
    e.preventDefault();
})

$("#submitBtn").on("click", function(){
    fillObject(userSearch);
    getData(userSearch);
    document.getElementById("nyt-form").reset();

})

$("#clearBtn").on("click", function() {
    $("#resultsDiv").empty();
})

// NYT API Call

function getData(object) {

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "112da6dc944c46e38175cc791005d94e",
    'q': object.searchTerm,
    'limit': object.numRecords,
    'begin_date': object.startYear,
    'end_date': object.endYear,
    'sort': "newest"
    });

    $.ajax({
    url: url,
    method: 'GET',
    }).then(function(result) {
    console.log(result);

    for (let i = 0; i < object.numRecords; i++) {
        var newItem = $("<div style='border:2px solid white; padding:10px; border-radius: 5px; margin:10px;'>");
        var headline = $("<a target='_blank' class='text-white' style='text-align:center; font-size:20px'></a><br>");
        headline.text(result.response.docs[i].headline.main);
        headline.attr("href", result.response.docs[i].web_url);
        $("#resultsDiv").append(newItem);
        newItem.append(headline);
    }

    }).fail(function(err) {
        alert("You need to fill out all form fields, bitch.");
    });
}