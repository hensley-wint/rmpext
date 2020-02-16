{
    document.addEventListener('DOMContentLoaded', documentEvents, false);

    function myAction(input) {
        var txt = new XMLHttpRequest();
        txt.open("GET", 'data.txt' ,true);
        txt.send(null);
        txt.onreadystatechange=function() {
            if (txt.readyState==4 && txt.status==200) {
                let result = txt.responseText;
                // Do something with result here
                var search_lname = input.value;
                lines = result.split("\n");

                for (var i = 0 ; i < lines.length ; i++){
                    var entry = lines[i].split(",")
                    // console.log(entry)
                    if (search_lname == entry[1]) {
                        // var outmes = entry[0] + " " + entry[1] + " has a rating of " + entry[2];
                        // console.log(outmes);
                        showoutput(entry);

                    }
                }
                console.log("finished");

                // alert("The entered data is : " + result)
            }
        }

    }

    function documentEvents() {
        document.getElementById('ok_btn').addEventListener('click',
            function() { myAction(document.getElementById('name_textbox'));
            });
    }
    function showoutput(entry){
        //var out = entry[0] + " " + entry[1] + "\n has a rating of \n" + `<h1 style='color: blue; font-size: 40'> ${entry[2]} </h1> `;
        var firstname = entry[0];
        var lastname = entry[1];
        firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
        lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);

        var name = firstname + " " + lastname;
        document.getElementById('name').innerText = name;
        document.getElementById('jointext').innerText = "rating:";
        var rating = parseFloat(entry[2]);
        console.log(rating);

        if (3.0 >= rating) {
            document.getElementById('rating').style.color = "red";
        } else if (4.0 >= rating) {
            document.getElementById('rating').style.color = "#FFC840";
        } else {
            document.getElementById('rating').style.color = "green";
        }

        document.getElementById('rating').innerText = entry[2];
    }
}