var topicArr = [
    'Star Trek',
    'Dune',
    'The Expanse',
    'NASA',
    'Space X',
    'X Files',
]


function genGif(topic) {

    var api_key = 'GLYlf1aVi8LQQsHb4inf9kUlc7NWxFVi'; //plz don't steal my api key
    var limit = '10';

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&rating=g&api_key=${api_key}&limit=${limit}`;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $('.card').remove();
        
        //for adding cards to the correct columns
        var colChoice = 1;

        for(var i=0;i<limit;i++){
            
            console.log(response.data[i]);

            var cardElem = $('<div>')
                            .addClass('card')
                            .attr('style','width: 18rem; height: 20rem;');
        
            var gifElem = $('<img>');

            gifElem.attr('src', response.data[i].images.fixed_height_still.url)
                    .addClass('gif')
                    .attr('still', response.data[i].images.fixed_height_still.url)
                    .attr('animate', response.data[i].images.downsized_large.url)
                    .attr('moving', 'false')
                    .attr('alt', response.data[i].title);
            
            var cardBodElem = $('<div>')
                            .addClass('card-body');
            
            $(cardBodElem).append($('<p>').text('Title: '+response.data[i].title));
            $(cardBodElem).append($('<p>').text('Rating: '+response.data[i].rating));

            $(cardElem).append(gifElem);
            $(cardElem).append(cardBodElem);

            if(colChoice === 1){
                $('#gifDiv1').append(cardElem);
                colChoice = 2; 
            }
            else if(colChoice === 2){
                $('#gifDiv2').append(cardElem);
                colChoice = 3;
            }
            else if(colChoice === 3){
                $('#gifDiv3').append(cardElem);
                colChoice = 1;
            }

            
        }
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


    $('#searchBtn').on('click', function (event) {
        event.preventDefault(); //prevents submit button event from bubbling to parent

        var newTopic = $('#gifSearch').val().trim(); //grabbing new topic text from #gifSearch element
        //prevents creation of empty button
        if (newTopic !== '') {

            topicArr.push(newTopic); //pushing newTopic into topicArr
            $('#gifSearch').val(''); //clearing search bar space

            createButtons(); //re-creating gif buttons
        }
        else {
            alert('Please enter a topic first');
        }
    });

    //For some reason this definition for an onclick event has to be used becuase the DOM doesn't see it otherwise
    $('#btnDiv').on('click','.gifBtn', function (event) {
        event.preventDefault(); //prevents submit button event from bubbling to parent

        $('#topicDisplay').text($(this).text());

        genGif( $( this ).attr('id') );
    });

    //Onclick function that plays and pauses gifs by switching the img src
    $('.gifDiv').on('click','.gif', function(event) {

        if( ($(this).attr('moving') == 'false') ){
            $(this).attr('src',$(this).attr('animate'));
            $(this).attr('moving','true');
        }
        else{
            $(this).attr('src',$(this).attr('still'));
            $(this).attr('moving','false');
        }
        
    });

    createButtons();

});
