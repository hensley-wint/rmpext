$(document).ready(function () {

    $("#ok_btn").click(function () {
        getresults();
    });

    function getresults() {
        var input = $("#name_textbox").val();
        console.log(input);
        var txt = new XMLHttpRequest();
        txt.open("GET", 'data.txt', true);
        txt.send(null);
        txt.onreadystatechange = function () {
            if (txt.readyState == 4 && txt.status == 200) {
                let result = txt.responseText;

                var search_lname = input;
                lines = result.split("\n");
                var matches = [];
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
                // get one entry at a time
                var entry = matches[i];
                // break up the names and capitalize them
                var firstname = entry[0];
                var lastname = entry[1];

                firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
                lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
                var name = firstname + " " + lastname;

                $("#answers").append(`<p id='name'> ${name} <p>`);

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
                $("#answers").last().append(`<div id="rating" style="color: ${color}">${entry[2]}</div>`);
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


//     // document.addEventListener('DOMContentLoaded', documentEvents, false);
//
//     function myAction(input) {
//         var txt = new XMLHttpRequest();
//         txt.open("GET", 'data.txt' ,true);
//         txt.send(null);
//         txt.onreadystatechange=function() {
//             if (txt.readyState==4 && txt.status==200) {
//                 let result = txt.responseText;
//
//                 var search_lname = input.value;
//                 lines = result.split("\n");
//                 var matches = [];
//                 for (var i = 0 ; i < lines.length ; i++){
//                     var entry = lines[i].split(",")
//
//                     if (search_lname == entry[1]) {
//                         matches.push(entry);
//                     }
//                 }
//                 showoutput(matches);
//             }
//         }
//     }
//
//     function documentEvents() {
//         document.getElementById('ok_btn').addEventListener('click',
//             function() { myAction(document.getElementById('name_textbox'));
//             });
//
//         document.getElementById('name_textbox').addEventListener('keydown',
//             function(event) {
//                 if(event.keyCode === 13){
//                     myAction(document.getElementById('name_textbox'));
//                 }
//             });
//
//         document.getElementById('clear_btn').addEventListener('click', function() { clearresults() });
//     }
//
//     function clearresults() {
//         document.getElementById('answers').innerHTML = "";
//         document.getElementById('noanswers').innerText = "";
//         document.getElementById('noanswers').style.padding = "0px 0px 0px 0px";
//
//     }
//
//     function showoutput(matches){
//
//         // check if matches were found or not
//         if (matches && matches.length) {
//             document.getElementById('noanswers').innerText = ""
//             document.getElementById('noanswers').style.padding = "0px 0px 0px 0px";
//
//             var answers = document.getElementById('answers');
//             for ( var i = 0; i<matches.length; i++) {
//                 // get one entry at a time
//                 var entry = matches[i];
//                 // break up the names and capitalize them
//                 var firstname = entry[0];
//                 var lastname = entry[1];
//                 firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
//                 lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
//                 var name = firstname + " " + lastname;
//
//
//                 // convert rating string to a number for comparison
//                 var rating = parseFloat(entry[2]);
//
//                 // create html tag for the name
//                 var namediv = document.createElement("p");
//                 var node = document.createTextNode(name)
//                 namediv.appendChild(node)
//                 namediv.id = 'name';
//                 answers.appendChild(namediv);
//
//                 // create html tag for the rating
//                 var ratingresult = document.createElement("p");
//                 ratingresult.id = 'rating';
//                 if (3.0 >= rating) {
//                     ratingresult.style.color = "red";
//                 } else if (4.0 >= rating) {
//                     ratingresult.style.color = "#FFC840";
//                 } else {
//                     ratingresult.style.color = "green";
//                 }
//                 var node = document.createTextNode(entry[2])
//                 ratingresult.appendChild(node);
//                 answers.appendChild(ratingresult);
//             }
//         } else {
//             // clear answers and add not found text
//             document.getElementById('answers').innerHTML = "";
//             document.getElementById('noanswers').innerText = "Not found";
//             document.getElementById('noanswers').style.padding = "15px 0px 0px 0px";
//         }
//     }
// }