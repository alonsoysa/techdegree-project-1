/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1s5grutGuQFwJcQP8bFwEI69Q8FCkGdDk/view?usp=sharing


/*** 
  Create the array of quote objects and name it `quotes`.
  Add at least five quote objects to the `quotes` array.
  Give each quote object a `quote` and `source` property.
  Add the `citation` property to at least one object in the array.
  Add the `year` property to at least one object in the array.
  Use console.log() to log your array of quotes to the console.
***/

// Declaring an array of quote objects
var quotes = [
  {
    quote: 'Adventure is out there!',
    source: 'Ellie',
    citation: 'Up',
    year: 2009,
  },
  {
    quote: 'If you focus on what you left behind you will never see what lies ahead.',
    source: 'Gusteau',
    citation: 'Ratatouille',
    year: 2007,
  },
  {
    quote: 'The rest of the world may follow the rules, but I must follow my heart.',
    source: 'Ernesto',
    citation: 'Coco',
    year: 2017,
  },
  {
    quote: 'Now, you might not feel like you can do much now, but that\'s just because, well, you\'re not a tree yet. You just have to give yourself some time. You\'re still a seed.',
    source: 'Flik',
    citation: 'A Bug\'s Life',
    year: 1998,
  },
  {
    quote: 'To infinity and beyond!',
    source: 'Buzz Lightyear',
    citation: 'Toy Story',
    year: 1995,
  },
];

//console.log(quotes);

/***
  Create the `getRandomQuote` function to:
   - Create a variable to store a random number 
   - Cse the random number to `return` a random quote object from the `quotes` array.
***/
function getRandomQuote(quotesArray) {
  var quote_key = Math.floor(Math.random() * quotesArray.length ) ;
  return quotesArray[quote_key];
}

// console.log( getRandomQuote(quotes) );

/***
  Create the `printQuote` function to: 
   - Call the `getRandomQuote` function and assign it to a variable.
   - Create a variable for the HTML string and set it equal to an empty string.
   - Use the HTML template in the instructions or the markup in the index.html file, AND 
     the random quote vairable to build your HTML string.
   - Add the quote and source section to the HTML string.
   - Use an if statement to check for the citation property before adding it to the HTML string.
   - Use an if statement to check for the year property before adding it to the HTML string.
   - Don't forget to close that final `p` tag.
   - Set the `innerHTML` of the `quote-box` div to the HTML string. 
***/
function propertyExists(the_prop) {
  var exist = false;

  if ( the_prop !== null && the_prop !== '' ) {
    exist = true;
  }

  return exist;
}

function printQuote() {
  var q_container = document.getElementById('quote-box');
  var q_object = getRandomQuote(quotes);
  var q_html = '';
  
  q_html += '<p class="quote">' + q_object.quote + '</p>';
  q_html += '<p class="source">' + q_object.source;

  if ( propertyExists(q_object.citation) ) {
    q_html += '<span class="citation">' + q_object.citation + '</span>';
  } 

  if (propertyExists(q_object.year) ) {
    q_html += '<span class="year">' + q_object.year + '</span>';
  }

  q_html += '</p>';
  
  q_container.innerHTML = q_html;
}



/***
  When the "Show another quote" button is clicked, the event listener 
  below will be triggered, and it will call, or "invoke", the `printQuote` 
  function. So do not make any changes to the line of code below this 
  comment.
***/

document.getElementById('loadQuote').addEventListener("click", printQuote, false);


// Remember to delete the comments that came with this file, and replace them with your own code comments.