var bulbs = {
  A: {
    pos: [85, 62],
    color: 'white'
  },
  B: {
    pos: [128, 55],
    color: 'blue'
  },
  C: {
    pos: [159, 56],
    color: 'pink'    
  },
  D: {
    pos: [225, 54],
    color: 'green'    
  },
  E: {
    pos: [264, 49],
    color: 'blue'    
  },
  F: {
    pos: [334, 50],
    color: 'yellow'    
  },
  G: {
    pos: [380, 36],
    color: 'pink'    
  },
  H: {
    pos: [439, 28],
    color: 'green'    
  },
  I: {
    pos: [30, 134],
    color: 'green'    
  },
  J: {
    pos: [94, 144],
    color: 'pink'
  },
  K: {
    pos: [132, 147],
    color: 'blue'
  },
  L: {
    pos: [177, 146],
    color: 'green'
  },
  M: {
    pos: [227, 142],
    color: 'yellow'
  },
  N: {
    pos: [273, 124],
    color: 'pink'
  },
  O: {
    pos: [323, 109],
    color: 'pink'
  },
  P: {
    pos: [378, 107],
    color: 'green'
  },
  Q: {
    pos: [492, 105],
    color: 'pink'
  },
  R: {
    pos: [61, 214],
    color: 'green'    
  },
  S: {
    pos: [103, 221],
    color: 'white'    
  },
  T: {
    pos: [139, 232],
    color: 'yellow'    
  },
  U: {
    pos: [190, 226],
    color: 'blue'    
  },
  V: {
    pos: [244, 225],
    color: 'pink'    
  },
  W: {
    pos: [289, 217],
    color: 'blue'    
  },
  X: {
    pos: [334, 211],
    color: 'yellow'    
  },
  Y: {
    pos: [393, 201],
    color: 'pink'    
  },
  Z: {
    pos: [477, 200],
    color: 'pink'    
  }  
};
var imageSize = [573, 430];
var bulbSize = 114;
var aspectRatio = imageSize[0] / imageSize[1];
var theUrl;

var lightBulb = function (lettersArray) {
  if (lettersArray.length === 0) {
    return;
  }
  var letter = lettersArray.shift();
  if (letter === ' ') {
    setTimeout(function () {
      lightBulb(lettersArray);
    }, 500);
    return;
  }  

  var $bkg = $(".alphabet");
  var bulb = bulbs[letter];  
  var $bulb = $("." + bulb.color + "-bulb");
  var bkgWidth = $bkg.width();
  var bkgHeight = Math.floor(bkgWidth / aspectRatio);
  var scale = bkgWidth / imageSize[0];
  var scaledBulbSize = bulbSize * scale;
  var relativeXPos;
  var relativeYPos;
  var actualXPos;
  var actualYPos;

  relativeXPos = bulb.pos[0] / imageSize[0];
  relativeYPos = bulb.pos[1] / imageSize[1];
  actualXPos = Math.floor(relativeXPos * bkgWidth - scaledBulbSize / 2);
  actualYPos = Math.floor(relativeYPos * bkgHeight - scaledBulbSize / 2);

  if ($bulb) {
    $bulb.css('left', actualXPos + 'px');
    $bulb.css('top', actualYPos + 'px');
    $bulb.css('height', scaledBulbSize + 'px');
    $bulb.css('width', scaledBulbSize + 'px')
    $bulb.css('background-size', scaledBulbSize + 'px');
  }


  $bulb.animate({
    opacity: 1
  }, 200, function () {
    setTimeout(function () {
      $(".pink-bulb, .white-bulb, .yellow-bulb, .blue-bulb, .green-bulb").animate({ opacity: 0 }, 200);
      setTimeout(function () {
        lightBulb(lettersArray);  
      }, 200);
    }, 600);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function filterOnlyChars(inputString) {
    var regex = new RegExp('[^A-Z ]', 'g');
    return inputString.replace(regex, '');
}

function lightMessage (message) {
  var upper = message.toUpperCase().trim();
  var filtered = filterOnlyChars(upper).replace(/\s\s+/g, ' ');
  lightBulb(filtered.split(''));
}

function showElement($el) {
  $el.animate({ opacity: 1 }, 200, function () {
    $el.css('display', 'block');
  });
}

function hideElement($el) {
  $el.animate({ opacity: 0 }, 200, function () {
    $el.css('display', 'none');
  });
}

$(document).ready(function () {
  var queryString = window.location.search;
  var message;
  var decodedMessage;
  var setMessageVisible = true;

  $('#textarea').bind('input', function (evt) {
    var encodedText = window.btoa(evt.target.value);
    var url = '';
    if (encodedText) {
      url = window.location.origin + window.location.pathname + '?msg=' + encodedText;      
      $('.copy-button').text('Copy URL');
      if (!$('.copy-button').is(':visible')) {
        $('.copy-button').show();  
      }
    } else {
      $('.copy-button').hide();
    }
    $('#url')[0].value = url;
  });

  $('button').bind('click', function (evt) {
    $('#url')[0].select();

    try {
      var successful = document.execCommand('copy');
      if (successful) {
        $('.copy-button').text('Copied!');
      } else {
        $('.copy-button').text('Oops! Try it manually');
      }
    } catch (err) {
      $('.copy-button').text('Oops! Try it manually');
    }
  });

  if (queryString) {
    queryString = queryString.substring(1);
    if (queryString.indexOf('msg=') > -1) {
      setMessageVisible = false;
      message = queryString.substring('msg='.length);
      decodedMessage = window.atob(message);
      lightMessage(decodedMessage);
    }
  }

  if (setMessageVisible) {
    showElement($('.set-message'));
  }
});

