/**
  Hexagram Object
**/
function Hexagram() {
  // set the main draw function
  this.draw = function (hexLines) {

    // begin building hexagram
    var fullThrow, changingLines, yinYangLines, matchedHexagram, changingLinesText;
    var hexLinesValid, notFound, specialFound, specialText;
    
    // set default values
    changingLines = [];
    yinYangLines = [];
    changingLinesText = [];
    notFound = "Not found";
    hexLinesValid = false;

    // check hexLines validity
    if (hexLines && hexLines.length == 6) {
      for (var i in hexLines) {
      	if (hexLines[i] == 6 || hexLines[i] == 7 || hexLines[i] == 8 || hexLines[i] == 9) {
      		hexLinesValid = true;
      	} // if
      	else {
      		hexLinesValid = false;
      		break;
      	} // else
      } // hexLines
    } // if
    else {
      hexLinesValid = false;
    } // else

    // set fullThrow
    if (hexLinesValid == true) {
    	fullThrow = hexLines;
    } // if
    else {
      fullThrow = [];

      // draw a hexagram - throw coins six times
      for (var i = 0; i < 6; i++) {
  	    var coin1 = Math.trunc(Math.random() * (3.9 - 2) + 2);
        var coin2 = Math.trunc(Math.random() * (3.9 - 2) + 2);
        var coin3 = Math.trunc(Math.random() * (3.9 - 2) + 2);

  	    fullThrow.push(coin1 + coin2 + coin3);
      } // for
    } // hexLines

    // find changing lines in fullThrow and set indices
    for (var i = 0; i < 6; i++) {
  	   var currentLine = fullThrow[i];

  	   if (currentLine == 6 || currentLine == 9) {
  	   	changingLines.push([i, currentLine]);
  	   } // add to changingLines array
    } // for

    // set yinYangLines to contain ying and yang lines corresponding to fullThrow
    for (var i = 0; i < 6; i++) {
  	  var currentLine = fullThrow[i];

  	  if (currentLine == 6 || currentLine == 8) {
  	    yinYangLines.push("yin");
  	  } // if
  	  else {
  	    yinYangLines.push("yang");
  	  } // else
    } // for

    // find the hexagram using the iching.js object
    for (var h in iching) {
      var i, matched;

      i = 0;
      matched = 0;

      while (i < 6) {
        
      	if (iching[h].allLines[i] == yinYangLines[i]) {
      		matched += 1;
      	} // if
      	else {
      		break;
      	} // else

      	i++;
      } // while

      if (matched == 6) {
      	matchedHexagram = iching[h];
      	break;
      } // if
    } // for

    // get changes text
    for (var i in changingLines) {
    	 line = "line" + changingLines[i][0].toString();
    	 changingLinesText.push(matchedHexagram[line]);
    } // for

    // check for special condition on hex1 or hex2
    specialFound = fullThrow[0] + fullThrow[1] + fullThrow[2] + fullThrow[3] + fullThrow[4] + fullThrow[5];

    // new hexagram drawn
    this.hexSymbol = matchedHexagram.hexCode || notFound;
    this.hexNumber = matchedHexagram.hexName.split(".")[0] || notFound;
    this.hexName = matchedHexagram.hexName.split(".")[1] || notFound;
    this.hexLines = fullThrow || notFound;
    this.hexJudgment = matchedHexagram.judgment || notFound;
    this.hexImage = matchedHexagram.image || notFound;
    this.hexChanges = changingLinesText;

    if (specialFound == 36 || specialFound == 54) {
      this.hexSpecial = matchedHexagram.special;
    } // if
    else {
      this.hexSpecial = null;
    } // else
    
    return 0;
  }; // draw

  // reset function
  this.reset = function () {
  	delete this.hexSymbol;
    delete this.hexNumber;
    delete this.hexName;
    delete this.hexLines;
    delete this.hexJudgment;
    delete this.hexImage;
    delete this.hexChanges;
    delete this.hexSpecial;
    return 0;
  }; // reset
  
  // change function
  this.change = function () {
    var presentLines, newLines;
    
    newLines = [];
    
    if (this.hexChanges && this.hexChanges.length !== 0) {
      presentLines = this.hexLines;
      
      for (var i in presentLines) {
        if (presentLines[i] == 6) {
          newLines.push(7);
        } // if
        else if (presentLines[i] == 9) {
          newLines.push(8);
        } // else if
        else {
          newLines.push(presentLines[i]);
        } // else
      } // for
      
      this.draw(newLines);
    } // if
    else {
      return 1;
    } // else
    
   return 0;
  } // change
} // Hexagram