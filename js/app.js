/**
  I Ching Oracle App
  app.js  
**/
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    var appStart; 
    
    appStart = main();
    
    if (appStart !== 0) {
      var pgContent;
      
      pgContent = document.getElementById("page_content");
      pgContent.innerHTML = "Sorry, an error occurred.  Please try again.";
    } // if
    
    return 0;
  } // if

  /** main **/
  function main() {
    var hex, hexDrawn, hexChange;
    var pgContent, pgPresent, pgMsg, pgFuture;
    
    // check for iching and Hexagram object
    if (!window.Hexagram || !window.iching) {
      return 2;
    } // if
    
    // create new hexagram
    hex = new Hexagram();
    hexDrawn = hex.draw();

    // if hexagram object is not ok, return 2
    if (hexDrawn !== 0) {
      return 2;
    } // if
    
    // fill out present elements
    pgContent = document.getElementById("page_content");
    pgPresent = document.getElementById("present");
    pgMsg = document.getElementById("oracle_msg");
    pgFuture = document.getElementById("future");
    
    // set present hex symbol, number, and title
    pgPresent.children[0].innerHTML = hex.hexSymbol;
    pgPresent.children[1].innerHTML = hex.hexNumber + ".&nbsp" + hex.hexName;

    // set present hex lines
    pgPresent.children[2].children[0].innerHTML = "Lines";
    pgPresent.children[2].children[1].innerHTML = hex.hexLines;

    // set present judgment
    pgPresent.children[3].children[0].innerHTML = "The Judgment";
    pgPresent.children[3].children[1].innerHTML = hex.hexJudgment;

    // set present image
    pgPresent.children[4].children[0].innerHTML = "The Image";
    pgPresent.children[4].children[1].innerHTML = hex.hexImage;
    
    // set present changes
    pgPresent.children[5].children[0].innerHTML = "Changes";
    
    for (var i in hex.hexChanges) {
      var spanElement, spanElementText, chgNum;
      
      chgNum = parseInt(i) + 1;
      spanElement = document.createElement("span");
      spanElement.classList.add("change-text");
      spanElementText = document.createTextNode(hex.hexChanges[i]);
      spanElement.innerHTML += "&bull;&nbsp;&nbsp;";
      spanElement.appendChild(spanElementText);

      pgPresent.children[5].children[1].appendChild(spanElement);
    } // for
    
    // print special if it exists
    if (hex.hexSpecial) {
      var specialElement, specialElementText;

      specialElement = document.createElement("span");
      specialElement.classList.add("change-text");
      specialElement.classList.add("special");
      specialElementText = document.createTextNode(hex.hexSpecial);
      specialElement.appendChild(specialElementText);

      pgPresent.children[5].children[1].appendChild(specialElement);
    } // if
    
    // change
    hexChange = hex.change();
    
    // when there are changes
    if (hexChange == 0) {
      // set oracle msg to The hexagram changes into...
      var msgText; 
      
      msgText = document.createTextNode("The hexagram changes into...");
      pgMsg.appendChild(msgText); 
      
      // set future hexagram
      pgFuture.children[0].innerHTML = hex.hexSymbol;
      pgFuture.children[1].innerHTML = hex.hexNumber + ".&nbsp;" + hex.hexName;
      pgFuture.children[2].children[0].innerHTML = "The Judgment";
      pgFuture.children[2].children[1].innerHTML = hex.hexJudgment;
      pgFuture.children[3].children[0].innerHTML = "The Image";
      pgFuture.children[3].children[1].innerHTML = hex.hexImage;
    } // populate future placeholders
    else {
      pgContent.removeChild(pgMsg);
      pgContent.removeChild(pgFuture);
      pgPresent.removeChild(pgPresent.children[5]);
    } // else remove placeholders
    
    hex.reset();
    return 0;
  } // init
  
} // onreadystatechange