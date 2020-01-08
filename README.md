Wireframes:https://imgur.com/a/nekb3Am



User Stories:
Unregistered User

  As an unregistered user, I would like to be able to sign up with email, password, and password confirmation<br/>
    -if email is already taken, then show error message and clear form<br/>
    -if password and password confirmation do not match, show error message and clear form<br/>
    -if email is unique and passsword/pc match then show success message and clear form<br/>
    -optional: if successful sign up-log in as a result.<br/>


  Registered User<br/>
    As a Registered user, I would like to be able to sign in with email and password<br/>
    As a Registered user, I would like to be able to change my password once signed in by   clicking a button, entering my old password and a new password +confirmation<br/>
    As a Registered user, I would like to be able to sign out with a button<br/>
    As a Registered user, I would like to be able to see the amount of games played with a button<br/>
    As a Registered user, I would like to be able to start a new game with a button<br/>
      As a user, I want to be able to click on a space so that the x or o is displayed.<br/>
      As a user, I want the game to tell me when a player has won with a message so that it is clear the game is over.<br/>
      As a user, I want the game to have a reset button so that I can play again without reloading.<br/>
      As a user, I would like to be able to see the current score, as well as which user is assigned to each character  <br/>
      As a user, I would like to be able to access an unfinished game by selecting it from a list<br/>


    Technologies used:
      HTML
      CSCC
      Bootstrap<
      Javascript
      game api 
      node 
      jquery
      AJAX
      getFormFields (provided by General Assembly)

      Development Process:
      I began with an html template of a game board using bootstrap to create a 3x3 'board' with borders all around the elements in order to create a grid. I added Id's to each element with a number that would later represent it's position in an array.<br/>

      After the board was created, I worked on allowing a click to add an X to the correct spot using  Jquery. I then began the game logic.js file. I needed to switch between x and o on click, so I had a variable to keep track. I had to make sure it was a valid click, and if it was, allow the click, and switch the player. To check for a valid click, I use classes in the HTML elements and jquery.

      I made  new Array to represent my moves that are completed, using the ID of the clicked element I pushed the move to that index in the array. (#3 was clicked on 'X' turn, push 'X' to Array[3]). I used a local variable for current turn at first, but needed it across files later and stored it within the store.js file.

      I created a message div in the HTML to display messages to the user, and quickly realized I would need a few different divs to keep track of different types of messages. There is one for warnings, (errors), one for general messages, and one dedicated to keeping track of the turn for the user. I began early on hiding and showing the messages as needed using jquery, however it took until the end debugging phase to really get them to ONLY show up as needed.

      Next I needed logic to check for wins and ties. For the wins, I loop through an array of win conditions. These represent '3 in a row' positions in the array, such as [0,1,2] equals a straight line, top row.  After a successful turn, I check for the current player in any combination of win conditions. If any are met, the game is set to over, which is a check before you're allowed to click a space. This allows me to stop users from continuing to play, and I make use of my warnings div to alert them of this.

      For a tie, I check my array to see if all 9 spots are occupied by an 'X' or an 'O'. If it got to that point without a winner, then game over, and it is a tie.

      I attempted from the beginning to keep the project modular by separating major functios, so I refactored to move some of the UI handling to the ui.js file within the game foler.

      I needed a way to play again, so I created a reset buttton. The reset button called a function within the ui.js file which reset all of my variables and looped through an array of the game board Id's setting their text to empty quotes.

      It was at this time that I decided to make my game a little nicer looking and work on some UI. It was a challenge to create a nice looking board, more than I would have imagined. It turns out that empty divs do not appear, so once I took away my placeholders my board would disappear. At first, I added an &nbsp sign to each one, which was an empty space essentially. This worked at first, but I eventually learned that I can set minimum and maximum heights to them to keep them visible, along with other properties. In addition, creating a square and responsive board wasn't as easy as I had imagined. I worked on it briefly, removing borders to create a 'real' tictactoe board, and once it was good enough I moved on to adding authentication with the API being used.

      I added in several forms, one at a time. Sign up was first, using the function provided from General Assembly, getFormFields I was able to retrieve data as needed and send it to the api using AJAX, and handling errors with a message to the user in the above mentioned warnings div. I did not like having the board on the page even for testing, so I quickly made a function to switch views between signed in and signed out.  Once I had a working sign up, I followed the same pattern to sign in.

      Once I was able to do all of the above, I added a sign out button that allowed me to logout from the API and change views again. This was relatively simple. Finally I needed a way to change passwords, but hated the idea of having it just sitting on the page. I began making use of the built in containers for bootstrap along with ID's and classes as needed to  change  views. I built a password form, but only allowed it to be its own view and only be accessed with a 'change password' button.

      I realized here I would later need a cancel button, but it was not part of the requirements for this project, so I made a note of it and moved on.

      Once I had the game logic and authentication figured out, I needed to work on allowing the game to work with the API, however I was excited about this project at home after dinner and had some fun with bootstrap making it look much nicer. I made the who page much more responsive, so that a square board would always show , with centered text for a proper looking board. I added colors, and some bootstrap buttons and forms. It was again much more difficult than anticipated to create  the aesthetic I desired, and many hours were spent googling "how to align center" and 'how to make a square in bootstrap'. In the end I am very pleased. I am also going to add a night mode soon.

      I soon moved on to actual functionality. I needed to allow my game to interact with a game api that kept track of games as well as created them. First step was to simply allow the reset button to be repurposed. It was now a create game button, and in addition to resetting my local game board, it would create a game board within the api. The api documents were a little confusing, but with some help I got it to work. Once I had a created game, I needed to allow it to be updated. The idea behind this is still not perfect, but for now, it is hidden behind several gates. These are a successful move, a win, or a tie. This is because each turn it should be updated with that moves turn, and on a game over I need to update the game over value to true. I used pretty easy logic to tell the api what to update, I pushed the current turn to the index that I was already pushing to my local game array.

      Finally I needed to allow for some statistics using the API. For now, when logged in, the game will show a message alerting the user to the amount of games he or she has completed. I added a new message div for this, and dedicated to this.

      After these minimum reuirements were met, I spent some time debugging, making sure that errors and messages were only shown as needed. I spent some time on the ui, I wanted everything to look even and clean. I created a "cancel" button that would change the view from "change password view" back to "signed in". I made sure to clear all forms as needed.

      Some unsolved problems of this app are :
      I want the user to be able to login on sign up. The functionality is already in the code, but unused because I am having trouble getting my pages to talk to eachother, and I am attempting to keep it modular.

      I would like a night mode. This is a fairly simple implement, I'll just add a toggle in the corner and change some CSS.

      I would like either AI or multiplayer. Both are quite a step up from the current functionality.

      I want to be able to finish unfinished games, I am working on the logic for this now.
