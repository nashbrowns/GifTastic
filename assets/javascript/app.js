var topicArr = [
    'Star Trek',
    'Dune',
    'The Expanse',
    'NASA',
    'Space X',
    'X Files',
]


function addTopic(topic) {

    var gifInfo;
    var api_key = 'GLYlf1aVi8LQQsHb4inf9kUlc7NWxFVi'; //plz don't steal my api key
    var limit = '10';

    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${topic}&rating=g&api_key=${api_key}&limit=${limit}`;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

}
function createButtons() {

    $('.gifBtn').remove(); //removes all gif generating buttons

    var topicStr; //temporarily holds a string from topic array

    //loops through array of topics and dynamically creates gif generating buttons
    for (var i = 0; i < topicArr.length; i++) {
        topicStr = topicArr[i].replace(' ', '+');
        var gifBtn = $('<button>')
            .addClass('gifBtn btn btn-info')
            .attr('id', topicStr)
            .text(topicArr[i]);

        $('#btnDiv').append(gifBtn);
    }

}

$(document).ready(function () {

    createButtons();

    $('#searchBtn').on('click', function (event) {
        event.preventDefault(); //prevents submit button event from bubbling to parent

        var newTopic = $('#gifSearch').val().trim(); //grabbing new topic text from #gifSearch element

        //prevents creation of empty button
        if (newTopic !== '') {

            topicArr.push(newTopic); //pushing newTopic into topicArr
            $('#gifSearch').val(''); //clearing search bar space

            createButtons(); //re-creating gif buttons
        }
        else{
            alert('Please enter a topic first');
        }
    });

});
