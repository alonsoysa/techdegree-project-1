/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// An array of quote objects based on Pixar movies!
var quotes = [
  {
    quote: 'Adventure is out there!',
    source: 'Ellie',
    citation: 'Up',
    year: 2009
  },
  {
    quote: 'If you focus on what you left behind you will never see what lies ahead.',
    source: 'Gusteau',
    citation: 'Ratatouille',
    year: 2007
  },
  {
    quote: 'The rest of the world may follow the rules, but I must follow my heart.',
    source: 'Ernesto',
    citation: 'Coco',
    graphic: 'coco.png',
    year: 2017
  },
  {
    quote: 'Now, you might not feel like you can do much now, but that\'s just because, well, you\'re not a tree yet. You just have to give yourself some time. You\'re still a seed.',
    source: 'Flik',
    citation: 'A Bug\'s Life',
    year: 1998,
    facts: [
            'Cumulative Worldwide Gross $363,258,859'
          ]
  },
  {
    quote: 'To infinity and beyond!',
    source: 'Buzz Lightyear',
    citation: 'Toy Story',
    year: 1995
  },
];


// Variable for storing the last shown quote
var previousQuote;

// Returns a random quote from the quotes object
function getRandomQuote() {

  // generates a random number from 0 to the amount of objects in Quotes.
  var quote_key = Math.floor( Math.random() * quotes.length ) ;

  return quotes[quote_key];
}

function randomColor() {
  // Generated a random value
  var r = Math.floor( Math.random() * 256 );
  var g = Math.floor( Math.random() * 256 );
  var b = Math.floor( Math.random() * 256 );

  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// Returns the html for displaying a quote.
// I moved this out of printQuote because it was getting too messy
function buildQuoteHTML(q_object) {
  var q_html = '';

  q_html += '<p class="quote">' + q_object.quote + '</p>';

  q_html += '<p class="source">' + q_object.source;

  // Only display if Citation is available
  if (q_object.citation) {
    q_html += '<span class="citation">' + q_object.citation + '</span>';
  }

  // Only display if Year is available
  if (q_object.year) {
    q_html += '<span class="year">' + q_object.year + '</span>';
  }

  q_html += '</p>';

  // Only display if Graphic is available
  if (q_object.graphic) {
    q_html += '<div class="graphic"><span>';
    q_html += '<img src="img/' + q_object.graphic + '" alt="Pixar' + q_object.source + 'logo">';
    q_html += '</span></div>';
  }

  return q_html;
}


// Prints out a random quote from our array of quotes
function printQuote() {
  var q_container = document.getElementById('quote-box');
  var q_object;
  var q_html = '';

  // Logic for preventing a quote repeat
  if (!previousQuote) {
    // Runs if no previous quote has been set
    q_object = getRandomQuote(quotes);
  } else {
    // Runs a loop until the previous quote doesn't repeat
    while ( true ) {
      q_object = getRandomQuote(quotes);

      // If is a new quote then break the loop
      if ( q_object !== previousQuote ) {
        break;
      }
    }
  }

  // Set the new previous quote
  previousQuote = q_object;
  
  // Add quote html to page
  q_container.innerHTML = buildQuoteHTML(q_object);
}


// Print a quote on first load
printQuote();


// Button action for generating a new quote
document.getElementById('loadQuote').addEventListener('click', printQuote, false);