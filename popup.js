$(document).ready(function () {

    $("#ok_btn").click(function () {
        getresults();
    });

    function getresults() {

        var txt = new XMLHttpRequest();
        txt.open("GET", 'data.txt', true);
        txt.send(null);
        txt.onreadystatechange = function () {
            if (txt.readyState == 4 && txt.status == 200) {
                let result = txt.responseText;

                var search_lname = $("#name_textbox").val().toLowerCase();

                var matches = [];
                var lines = result.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var entry = lines[i].split(",");

                    if (search_lname == entry[1]) {
                        matches.push(entry);
                    }
                    ;
                }
                ;
                showoutput(matches);
            }
            ;
        };
    };

    function showoutput(matches) {
        console.log(matches);
        // check if matches were found or not
        if (matches && matches.length) {
            $("#noanswers").hide();

            for (var i = 0; i < matches.length; i++) {
                if ($("#answers").html() != ""){
                    $("#answers").append('<hr>');
                }

                // get one entry at a time
                var entry = matches[i];
                // break up the names and capitalize them
                var firstname = entry[0];
                var lastname = entry[1];

                firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
                lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
                var name = firstname + " " + lastname;

                $("#answers").append(`<div id='name'> ${name} </div>`);

                // convert rating string to a number for comparison
                var rating = parseFloat(entry[2]);
                var color = "blue";
                if (3.0 >= rating) {
                    color = "red";
                } else if (4.0 >= rating) {
                    color = "#FFC840";
                } else {
                    color = "green";
                }

                // create html tag for the rating
                $("#answers").append(`<div id="rating" style="color: ${color}">${entry[2]}</div>`);

                // remove s from  ratings if there is only one rating
                var num_ratings = entry[3];
                var num = parseInt(entry[3].split(" ")[0], 10);
                if (num == 1){
                    entry[3] = entry[3].substring(0,(entry[3].length-1));
                }


                $("#answers").append(`<div id='numReviews' style="color: black">${entry[3]}</div>`);

            }
        } else {
            $("#answers").empty();
            $("#noanswers").show();

        }
        ;
    };
    // clear button
    $("#clear_btn").click(function () {
        $("#answers").empty();
        $("#noanswers").hide();
        $("#name_textbox").val("");
    });

    // press enter button to get results
    $("#name_textbox").on("keydown", function (event) {
        if (event.key === "Enter") {
            getresults();
        }
        ;
    });
});
