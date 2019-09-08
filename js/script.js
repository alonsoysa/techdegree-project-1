/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

/**
* 1. An array of quote objects based on Pixar movies!
*/
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
    imdb_id: 'tt2380307',
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


/**
* 1. Global variables
*/
var body = document.body;
// Quote Vars
var quoteLength = quotes.length;
var autoQuoteRotation = 5000; // every 3 seconds
var previousQuote;
var autoQuote;
var bg_color;

// Progress Vars
var progressBarElement = document.getElementById('pauseQuote-pause-bg');
var progressBarWidth = 0;
var progressBarWidthTimer = autoQuoteRotation / 100;
var progressBarInterval;

/**
* 2. Returns a random number
*   - upper = the highest number (optional)
*   - lower = the lowest number (optional)
*   A. Returns a number from the specified range
*   B. Returns a number from 0 to the specified upper number
*   C. Returns a number from 1 to 100
*/
function getRandomNumber(upper, lower) {
  var random_number;
  var upper_default = 100;
  var lower_default = 1;

  // A
  if ( upper && lower ) {
    random_number = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  } 
  // B
  else if ( upper && !lower ) {
    random_number = Math.floor(Math.random() * upper);
  } 
  // C
  else {
    random_number = Math.floor(Math.random() * (upper_default - lower_default + 1)) + lower_default;
  }

  return random_number;
}


/**
* 3. Returns a random quote from the quotes object
*/
function getRandomQuote() {
  var quote_key = getRandomNumber(quoteLength);
  return quotes[quote_key];
}


/**
* 4. Generate a random rgb color
*/
function getRandomColor() {
  // Generate a random value for each color.
  // I picked 210 instead of 255 so that the text contrast
  // doesn't get affected by the background.
  // The lower the number, the darker the color.
  var r = getRandomNumber(210);
  var g = getRandomNumber(210);
  var b = getRandomNumber(210);

  return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/**
* 5. Returns the html for displaying a quote.
*/
function buildQuoteHTML(q_object) {
  var q_html = '<div class="quote-wrapper">';

  // Start building markup
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

  q_html += '</p></div>';

  // Only display if Graphic is available
  if (q_object.graphic) {
    q_html += '<div class="graphic"><span>';

    if ( q_object.imdb_id) {
      q_html += '<a href="https://www.imdb.com/title/' + q_object.imdb_id + '" target="_blank">';
    }

    q_html += '<img src="img/' + q_object.graphic + '" alt="Pixar' + q_object.source + 'logo">';

    if (q_object.imdb_id) {
      q_html += '</a>';
    }

    q_html += '</span></div>';
  }

  return q_html;
}


/**
* 6. Prints a random quote from our array of quotes
*/
function printQuote() {
  var q_container = document.getElementById('quote-box');
  var q_object;
  var q_html = '';
  bg_color = getRandomColor();

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

  // Updated the page background
  // Research from: https://www.w3schools.com/jsref/prop_doc_body.asp
  body.style.backgroundColor = bg_color;
  playIndicator();
}

function printQuote_btn() {
  clearInterval(autoQuote);
  autoQuote = setInterval(printQuote, autoQuoteRotation);
  printQuote();
}


/**
* 7. Plays and pauses quote
* Research: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
*/
function pausePlayQuote() {
  var element = this; 

  clearInterval(autoQuote);
  progressBarWidth = 0;
  clearInterval(progressBarInterval);

  // Pause by clearing the interval and removing the active class
  if( element.classList.contains('active') ) {
    element.classList.remove('active');
  } 
  
  // Resume by setting an interval and adding active class
  else {
    element.classList.add('active');
    printQuote_btn();
    playIndicator();
  }
}


/**
* 8. Displays progress bar between intervals
* Research: https://www.w3schools.com/jsref/met_win_setinterval.asp
*/
function playIndicator() {
  clearInterval(progressBarInterval);
  progressBarWidth = 0;
  progressBarElement.style.backgroundColor = bg_color;
  progressBarInterval = setInterval(playIndicator_frame, progressBarWidthTimer);
}
function playIndicator_frame() {
  progressBarWidth++;
  progressBarElement.style.width = progressBarWidth + '%';
}


/**
* 8. Button action for generating a new quote
*/
document.getElementById('loadQuote').addEventListener('click', printQuote_btn, false);


/**
* 9. Button action for generating a new quote
*/
document.getElementById('pauseQuote').addEventListener('click', pausePlayQuote, false);


/**
* 10. Run our program on page load
*/
printQuote();


/**
* 11. Run our program on page load
* Research from: https://www.w3schools.com/jsref/met_win_setinterval.asp
*/
autoQuote = setInterval(printQuote, autoQuoteRotation);