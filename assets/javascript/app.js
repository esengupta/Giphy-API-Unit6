$(document).ready(function () {
  //Array for searched topics to be added
  var topics = [];

  //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
  function displayNetflixShow() {

    var x = $(this).data("search");
    console.log(x);
    ///////////////// GIPHI ////////////////////////////
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=chcDlPQEsdhg15kDcT4sreRM75YxYoHn&limit=10";

    console.log(queryURL);
    // Creating an AJAX call for the specific Giphy button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {

      $("#gifArea").text('');
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var rowDiv = $("<div class='row'>");

        var showDiv = $("<div class='col-md-6'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("netflixGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);

        $("#gifArea").prepend(showDiv);

      }
    });
    ///////////////////////// GIPGY end....//////////////////////


    /////////////////// OMDB start..../////////////////////
    // TODO: change url
    // var x = ["Luke Cage", "Jassica Jones", "Pingu", "Srranger Things","Narcos"];

    // displayNetflixShow function re-renders the HTML to display the appropriate content


    //   var x = $(this).attr("data-name");

    var queryURL = "https://www.omdbapi.com/?i=tt3896198&apikey=a4ddc03d&t=" + x;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      $("#movieArea").text('');
      // console.log(JSON.stringify(response));
      var results = response;
      console.log(results);
      var movieDiv = $("#movieArea");
      // for (var i = 0; i < results.length; i++) {
      var rowDiv = $("<div class='row'>");

      var showDiv = $("<div class='col-md-4'>");

      //    //parse results
      //    // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + results.Rated);
      //    // Displaying the rating
      movieDiv.append(pOne);

      //    // Storing the release year
      var released = response.Released;

      //    // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      //    // Displaying the release year
      movieDiv.append(pTwo);
      //    //Storing the plot
      var plot = response.Plot;

      //       // Creating an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);

      //       // Appending the plot
      movieDiv.append(pThree);
      //     // Retrieving the URL for the image
      var imgURL = response.Poster;

      //     // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      //     // Appending the image
      movieDiv.append(image);



      //   // Putting the entire movie above the previous movies
      $("#movieArea").prepend(showDiv);
      // }
    });
    ///////////////////////// OMDB end....//////////////////////
  }

  //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
  $("#addShow").on("click", function (event) {
    event.preventDefault();
    var newShow = $("#netflixInput").val().trim();
    topics.push(newShow);
    console.log(topics);
    $("#netflixInput").val('');
    displayButtons();
  });
  
  // Function to remove last search button
  // rather than just the last

  $("#removeLastShow").on("click", function (event) {
    event.preventDefault();
    topics.pop();
    console.log(topics);
    displayButtons();

  });


  //Function iterates through topics array to display button with array values in "myButtons" section of HTML
  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.attr("data-index", i);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  //Click event on button with id of "show" executes displayNetflixShow function
  $(document).on("click", "#show", displayNetflixShow);

  //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
  $(document).on("click", ".netflixGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

});