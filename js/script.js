/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator

0. An array of quote objects based on Pixar movies!
1. Global variables
2. Random number
3. Random quote
4. Random RGB color
5. Build quote HTML
6. Quote logic
7. Display quote
8. Plays and pauses quote
9. Play indicator logic
10. Display play indicator
11. Play music
12. Button action for generating a new quote
13. Button action for pausing auto quote
14. Button action for playing music
15. Run program on page load

******************************************/

/**
* 0. An array of quote objects based on Pixar movies!
* - Ideally this will be moved to it's own .json file in the future
*/
var quotes = [
  {
    quote: 'Some say fate is beyond our command, but I know better. Our destiny is within us. You just have to be brave enough to see it.',
    source: 'Merida',
    citation: 'Brave',
    year: 2012,
    graphic: 'brave.png',
    imdb_id: 'tt1217209',
  },
  {
    quote: 'You can do whatever you put your mind to',
    source: 'Jenny',
    citation: 'Finding Dory',
    year: 2016,
    graphic: 'dory.png',
    imdb_id: 'tt2277860',
  },
  {
    quote: 'Adventure is out there!',
    source: 'Ellie',
    citation: 'Up',
    year: 2009,
    graphic: 'up.png',
    imdb_id: 'tt1049413',
  },
  {
    quote: 'We can\'t focus on what\'s going wrong, there\'s always a way to turn things around.',
    source: 'Joy',
    citation: 'Inside Out',
    year: 2015,
    graphic: 'insideout.png',
    imdb_id: 'tt2096673',
  },
  {
    quote: 'Reach for the sky!',
    source: 'Woody',
    citation: 'Toy Story',
    graphic: 'toystory.png',
    imdb_id: 'tt0114709',
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
    graphic: 'abugslife.png',
    imdb_id: 'tt0120623',
    year: 1998,
  },
  {
    quote: 'To infinity and beyond!',
    source: 'Buzz Lightyear',
    citation: 'Toy Story',
    graphic: 'toystory.png',
    imdb_id: 'tt0114709',
    year: 1995
  },
  {
    quote: 'I never look back, darling.It distracts me from the now.',
    source: 'Edna Mode',
    citation: 'The Incredibles',
    graphic: 'theincredibles.png',
    imdb_id: 'tt0317705',
    year: 1995
  }
];


/**
* 1. Global variables
*/
var body = document.body;
var bg_color;
var musicElement = document.getElementById('music');

// Triggers
var triggerQuote = document.getElementById('loadQuote');
var triggerPauseQuote = document.getElementById('pauseQuote');
var triggerPlayMusic = document.getElementById('playMusic');

// Quote Vars
var quoteLength = quotes.length;
var autoQuoteRotation = 5000; // every 3 seconds
var previousQuote;
var autoQuote;

// Progress Vars
var progressBarElement = document.getElementById('pauseQuote-pause-bg');
var progressBarWidth = 0;
var progressBarWidthTimer = autoQuoteRotation / 100;
var progressBarInterval;


/**
* 2. Random Quote
* - Returns a random number
* - upper = the highest number (optional)
* - lower = the lowest number (optional)
* A. Returns a number from the specified range
* B. Returns a number from 0 to the specified upper number
* C. Returns a number from 1 to 100
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
* 3. Random Quote
* - Returns a random quote from the quotes object
*/
function getRandomQuote() {
  var quote_key = getRandomNumber(quoteLength);
  return quotes[quote_key];
}


/**
* 4. Random RGB Color
* - Generates a random rgb color
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
* 5. Build Quote HTML
* - Returns the html for displaying a quote.
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

    // Only add link if imdb id is present
    if ( q_object.imdb_id) {
      q_html += '<a href="https://www.imdb.com/title/' + q_object.imdb_id + '" target="_blank">';
    }

    // Show image even if link is not present
    q_html += '<img src="img/' + q_object.graphic + '" alt="Pixar' + q_object.source + 'logo">';

    if (q_object.imdb_id) {
      q_html += '</a>';
    }

    q_html += '</span></div>';
  }

  return q_html;
}


/**
* 6. Quote logic
* - Prints a random quote from our array of quotes
* - Assigns the body color
*/
function printQuoteAction() {
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

  // Show progress bar indicator
  playIndicator();
}


/**
* 7. Display quote
- Clears any intervals before printing the quote to page
*/
function printQuote() {
  clearInterval(autoQuote);
  autoQuote = setInterval(printQuoteAction, autoQuoteRotation);
  printQuoteAction();
}


/**
* 8. Plays and pauses quote
* Research: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
*/
function pausePlayQuote() {
  var element = this; 

  // Reset all intervals and progress indicator
  clearInterval(autoQuote);
  clearInterval(progressBarInterval);
  progressBarWidth = 0;

  // Pause by clearing the interval and removing the active class
  if( element.classList.contains('active') ) {
    element.classList.remove('active');
  } 
  
  // Resume by setting an interval and adding active class
  else {
    element.classList.add('active');
    printQuote();
    playIndicator();
  }
}


/**
* 9. Play indicator logic
- Updates the width of the progress bar
*/
function playIndicatorAction() {
  progressBarWidth++;
  progressBarElement.style.width = progressBarWidth + '%';
}


/**
* 10. Display play indicator
* - Displays progress bar for play/pause button
* - Research: https://www.w3schools.com/jsref/met_win_setinterval.asp
*/
function playIndicator() {
  // Resets any previous progress bar
  clearInterval(progressBarInterval);
  progressBarWidth = 0;

  // Uses the same background random color set for the body
  progressBarElement.style.backgroundColor = bg_color;

  // Sets the interval for updating the progress bar width
  progressBarInterval = setInterval(playIndicatorAction, progressBarWidthTimer);
}


/**
* 11. Play music
* - Controls the audi player ( html5 )
* - Research: https://www.w3schools.com/tags/att_audio_loop.asp
* - Research: https://www.w3schools.com/tags/av_met_play.asp
*/
function playMusic() {

  // If is already active then pause
  if (triggerPlayMusic.classList.contains('active') ) {
    triggerPlayMusic.classList.remove('active');
    musicElement.pause();
  } 
  
  // Otherwise play on!
  else {
    triggerPlayMusic.classList.add('active');
    musicElement.play();
  }
}


/**
* 12. Button action for generating a new quote
*/
triggerQuote.addEventListener('click', printQuote, false);


/**
* 13. Button action for pausing quote
*/
triggerPauseQuote.addEventListener('click', pausePlayQuote, false);

/**
* 14. Button action for playing music
*/
triggerPlayMusic.addEventListener('click', playMusic, false);


/**
* 15. Run our program on page load
*/
printQuote();