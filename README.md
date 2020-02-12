# Web-Based Tic-Tac-Toe

This is my first ever project done at General Assembly Boston during my third week of classes. The application allows a user to sign up and login to an app to play Tic-Tac-Toe. The user will then see how many games he or she has completed and won, have the option to create new games, and reset their password.

## Important Links

- [Wireframes](https://imgur.com/a/nekb3Am)
- [Deployed Client](https://joe-protz.github.io/TicTacToe-client/)
- [LinkedIn](https://www.linkedin.com/in/joe-protz/)
- [GitHub](https://www.github.com/joe-protz)
- [Portfolio](https://joe-protz.github.io/#)

## Planning Story

I began with an html template of a game board using bootstrap to create a 3x3 'board' with borders all around the elements in order to create a grid. I added Id's to each element with a number that would later represent it's position in an array.

After the board was created, I worked on allowing a click to add an X to the correct spot using Jquery. I then began the game logic.js file. I needed to switch between x and o on click, so I had a variable to keep track. I had to make sure it was a valid click, and if it was, allow the click, and switch the player. To check for a valid click, I use classes in the HTML elements and jquery.

I made new Array to represent my moves that are completed, using the ID of the clicked element I pushed the move to that index in the array. (#3 was clicked on 'X' turn, push 'X' to Array[3]). I used a local variable for current turn at first, but needed it across files later and stored it within the store.js file.

I created a message div in the HTML to display messages to the user, and quickly realized I would need a few different divs to keep track of different types of messages. There is one for warnings, (errors), one for general messages, and one dedicated to keeping track of the turn for the user. I began early on hiding and showing the messages as needed using jquery, however it took until the end debugging phase to really get them to ONLY show up as needed.

Next I needed logic to check for wins and ties. For the wins, I loop through an array of win conditions. These represent '3 in a row' positions in the array, such as [0,1,2] equals a straight line, top row. After a successful turn, I check for the current player in any combination of win conditions. If any are met, the game is set to over, which is a check before you're allowed to click a space. This allows me to stop users from continuing to play, and I make use of my warnings div to alert them of this.

For a tie, I check my array to see if all 9 spots are occupied by an 'X' or an 'O'. If it got to that point without a winner, then game over, and it is a tie.

I attempted from the beginning to keep the project modular by separating major functions, so I refactored to move some of the UI handling to the ui.js file within the game foler.

I needed a way to play again, so I created a reset buttton. The reset button called a function within the ui.js file which reset all of my variables and looped through an array of the game board Id's setting their text to empty quotes.

It was at this time that I decided to make my game a little nicer looking and work on some UI. It was a challenge to create a nice looking board, more than I would have imagined. It turns out that empty divs do not appear, so once I took away my placeholders my board would disappear. At first, I added an &nbsp sign to each one, which was an empty space essentially. This worked at first, but I eventually learned that I can set minimum and maximum heights to them to keep them visible, along with other properties. In addition, creating a square and responsive board wasn't as easy as I had imagined. I worked on it briefly, removing borders to create a 'real' tictactoe board, and once it was good enough I moved on to adding authentication with the API being used.

I added in several forms, one at a time. Sign up was first, using the function provided from General Assembly, getFormFields I was able to retrieve data as needed and send it to the api using AJAX, and handling errors with a message to the user in the above mentioned warnings div. I did not like having the board on the page even for testing, so I quickly made a function to switch views between signed in and signed out. Once I had a working sign up, I followed the same pattern to sign in.

Once I was able to do all of the above, I added a sign out button that allowed me to logout from the API and change views again. This was relatively simple. Finally I needed a way to change passwords, but hated the idea of having it just sitting on the page. I began making use of the built in containers for bootstrap along with ID's and classes as needed to change views. I built a password form, but only allowed it to be its own view and only be accessed with a 'change password' button.

I realized here I would later need a cancel button, but it was not part of the requirements for this project, so I made a note of it and moved on.

Once I had the game logic and authentication figured out, I needed to work on allowing the game to work with the API, however I was excited about this project at home after dinner and had some fun with bootstrap making it look much nicer. I made the whole page much more responsive, so that a square board would always show , with centered text for a proper looking board. I added colors, and some bootstrap buttons and forms. It was again much more difficult than anticipated to create the aesthetic I desired, and many hours were spent googling "how to align center" and 'how to make a square in bootstrap'. In the end I am very pleased. I am also going to add a night mode soon.

I soon moved on to actual functionality. I needed to allow my game to interact with a game api that kept track of games as well as created them. First step was to simply allow the reset button to be repurposed. It was now a create game button, and in addition to resetting my local game board, it would create a game board within the api. The api documents were a little confusing, but with some help I got it to work. Once I had a created game, I needed to allow it to be updated. The idea behind this is still not perfect, but for now, it is hidden behind several gates. These are a successful move, a win, or a tie. This is because each turn it should be updated with that moves turn, and on a game over I need to update the game over value to true. I used pretty easy logic to tell the api what to update, I pushed the current turn to the index that I was already pushing to my local game array.

Finally I needed to allow for some statistics using the API. For now, when logged in, the game will show a message alerting the user to the amount of games he or she has completed. I added a new message div for this, and dedicated to this.

After these minimum reuirements were met, I spent some time debugging, making sure that errors and messages were only shown as needed. I spent some time on the ui, I wanted everything to look even and clean. I created a "cancel" button that would change the view from "change password view" back to "signed in". I made sure to clear all forms as needed.

After I had completed the base game, I chained some functions together to allow sign in on sign up. I will need to take a second look at this, but for now I store the sign up data in a temp object and pass it into sign in.

Next dark mode was added. Adding a button to turn on night mode was easy enough, but I wanted to be able to switch back and forth. I could have created a single button toggle and may look into this in the future, but for now there are two buttons to toggle back and forth.

After this, for fun I added a 'crazy mode' where the user can play a spinning disorienting and color-changing version of tic tac toe. It is only available to authorized logins, and automatically disables on logout. In addition, it remembers which mode was on last, so when toggled it defaults back to the last view.

Finally I have implemented an AI. I started with just adding a button and a check to see if the user has toggled this button. I added a new .js file called ai.js to hold the function where if the button was toggled, run that instead. The beginning was just making sure the toggle worked. I added the same game logic to this file, but used console logs to allow me to be sure I was ending up where I wanted.

After that, I had to think about how to represent a computer playing. I decided it should happen automatically after each valid turn the user takes, so it is shown as a function a the end of the player's turn. It started with checking the DOM board representation for all elements that have yet to be clicked, and clicking the first one. Once this worked, I had to implement the same logic as it would normally take, checking for a win, a tie, a game over, etc.

Once this was working, as far as I could tell, the next step was to randomize the choice made by the computer. This worked fairly well, but I quickly noticed that the user stats weren't updating correctly. I spent some time problem solving and noted that the return from the API was defintely incorrect 'some' of the time. I found out this was caused from a race condition. Basically I was doing things before the API was finished , and causing data to get jumbled, so I then refactored the code to only take the AI turn AFTER the promise was returned from the user.

This seemingly solved all of my issues, except that the 'check for tie' function was no longer reliable. After several hours, I realied that I had randomized the AI's choice, but had forgot to push the correct move into the javascript representation of the board. Finally it was working as inteneded.

After all of this, I spent some time adding AI logic. According to wikipedia, TicTacToe is a solved game, and there are optimal moves, so I began implementing some of them. For example, if there is a spot to win, just take it. If the opponent could win, take that spot. I have only implemented some logic and it defaults to random if no criteria are met, I would like to add more later.

On the way to my classes on a train, I noticed that I was allowed to play against the AI many turns in a row. This was because the AI was waiting for me to click, but I had no check to see if the AI had completed it's update. I could click 3 x's in a row before the ai went. I got around this with a variable asking if the AI was finished, which was changed on player click and as a promise after the ai updated the game.

For sake of consistency, I added the same gate to single player ('no ai').

After some time passed, I found myself continually working on this project. I loved polishing it more and more. In the back of my head I kenw what I really wanted was an algorithm for the AI. I began implementing the minimax algorithm. This was a serious challenge for me, as debugging wasn't as simple as a console log when the function is recursive and happening thousands of times per click. It took many online resources such as youtube [Coding Train is awesome](www.youtube.com/codingtrain) and wikipedia psudocode, and reading over the algorithm several hundred times line by line, commenting it out, talking to my rubber duck, etc to start to make sense of what was happening and what needed to work in order for the
algorithm to be correct.

In the end, the biggest hurdle actually ended up being my score finding algoritm. Minimax relies on the ability to see if the path it's taking ends in a win, loss, or tie, and I was unfortunately not allowing for proper scoring as I had several overrides within my loop. Meaning, if my algorithm found a win, it would then continue to loop through and say "well this next possibility isnt a win, so it must be a tie after all". Anyway, I eventually got it to work, and even added depth heuristic without any resources. Not that resources are bad in any way, I had just finally understood the algorithm enough that I didn't need it.

After minimax was added, a lot of refactoring, ui touch ups, and small changes to logic were the focus. I wanted my buttons to be more intuitive, I wanted who won to be obvious if the user could not see the message for whatever reason, I wanted to make sure my code was fairly easy to follow and as DRY as I could make it for my current skill level and free time. I added little loading spinners for auth events so that the user wtih a bad connection doesn't go crazy wondering if anything is happening. I made the crazy mode have a toast (popup) to ensure the user is warned of seizure risk.

All in all, I have had a ton of fun with this project and cannot wait for the next one.

### User Stories

Unregistered User:

- As an unregistered user, I would like to be able to sign up with email, password, and password confirmation
  - if email is already taken, then show error message and clear form
  - if password and password confirmation do not match, show error message and clear form
  - if email is unique and passsword/pc match then show success message and clear form
  - optional: if successful sign up- log in as a result.

* Registered User
  - As a Registered user, I would like to be able to sign in with email and password
  - As a Registered user, I would like to be able to change my password once signed in by clicking a button, entering my old password and a new password +confirmation
  - As a Registered user, I would like to be able to sign out with a button
  - As a Registered user, I would like to be able to see the amount of games played with a button
  - As a Registered user, I would like to be able to start a new game with a button
  - As a Registered user, I want to be able to click on a space so that the x or o is displayed.
  - As a Registered user, I want the game to tell me when a player has won with a message so that it is clear the game is over.
  - As a Registered user, I want the game to have a reset button so that I can play again without reloading.
  - As a Registered user, I would like to be able to see the current score, as well as which Registered user is assigned to each character
  - As a Registered user, I would like to be able to access an unfinished game by selecting it from a list

### Technologies Used

- HTML
- CSS
- SASS
- Bootstrap
- Javascript
- Provided Rails API
- Node
- jQuery
- AJAX
- getFormFields (provided by General Assembly)

### Unsolved Problems

- I want to be able to finish unfinished games, I am working on the logic for this now.
- I want to rethink warnings and messages to be more intuitive and possibly not need messages at all
- I want a rethink easy mode as a possible challenge mode, where the difficulty scales with each win and the goal is to get maybe 5 or 10 wins without losing the challenge. If you get this, crazy mode is unlocked?
- I want to continue to refactor as I learn more about good code principals
