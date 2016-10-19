
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $address = $street + ", "+ $city;
    var height = window.innerHeight;
    var width = window.innerWidth;
    var size = width + "x" + height;

    var $streetview = 'https://maps.googleapis.com/maps/api/streetview?location=' + $address + '&key=AIzaSyA7GFm9PELZ7ALhF_XnL7CvWavW7DWc8Rs&size=' + size +'';
    $body.append('<img class="bgimg" src="' + $streetview + '">');

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=46ef0b9b785b44fe896078856cd28a16&q="+$city+"";

    $.getJSON(url, function(data){
        var items = [];
        $.each( data.response.docs, function( key, val ) {
          items.push("<li id='" + data.response.docs[key]._id + "'><a href='"+ data.response.docs[key].web_url +"'>" + data.response.docs[key].headline.main + "</a><p>" + data.response.docs[key].snippet +"</li>" );
        });

        $nytElem.html(items);
    })
    .error(function(){
        $nytHeaderElem.text('The New York Times articles could not be loaded.');
    });

    var urlWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $city +"&format=json&?callback=?wrapResults";

    $.ajax({
        url: urlWiki,
        dataType: "jsonp",
        success: function(response){
            var wikiResult = response[1];
            for (var i = 0; i < wikiResult.length; i++) {
                $wikiElem.append("<li id='" + wikiResult[i] + "'><a href='"+ response[3][i] +"'>" + wikiResult[i] + "</a></li>");
            }
        }
    });

    return false;
};

$('#form-container').submit(loadData);
