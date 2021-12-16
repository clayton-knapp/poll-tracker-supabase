// import functions and grab DOM elements

import { renderPoll } from '../render-utils.js';
import { logOut } from '../fetch-utils.js';


const pollForm = document.querySelector('#poll-form');

const optionAAdd = document.querySelector('#option-a-add');
const optionBAdd = document.querySelector('#option-b-add');

const endPoll = document.querySelector('#end-poll-button');

const optionADisplay = document.querySelector('#option-a-display');
const optionBDisplay = document.querySelector('#option-b-display');
// const pollQuestionDisplay = document.querySelector('#poll-question-display');

const currentPollDiv = document.querySelector('#current-poll-div');
const pastPollsDiv = document.querySelector('#past-polls-div');

const logOutButton = document.querySelector('#log-out');


// let state

let pollQuestion = 'Poll Question';
let optionA = 'Option A';
let optionB = 'Option B';
let optionAVotes = 0;
let optionBVotes = 0;
let pastPollsArr = [];

//calls displayCurrent Poll to show empty current poll div on load
displayCurrentPoll();

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state

pollForm.addEventListener('submit', (e)=> {
    // Form Submit/Create Poll
    // - prevents default behavior
    e.preventDefault();

    // - grabs data from form using `new FormData`
    const data = new FormData(pollForm);

    // - update state of Current Poll Question and Options
    pollQuestion = data.get('question-input');
    optionA = data.get('option-a-input');
    optionB = data.get('option-b-input');


    // - Display that in the DOM
    // pollQuestionDisplay.textContent = pollQuestion;
    optionADisplay.textContent = optionA;
    optionBDisplay.textContent = optionB;

    // - clear the form inputs
    pollForm.reset();

    //Display the current poll Div
    displayCurrentPoll();
});

optionAAdd.addEventListener('click', ()=>{
    optionAVotes++;
    displayCurrentPoll();
});

optionBAdd.addEventListener('click', ()=>{
    optionBVotes++;
    displayCurrentPoll();
});

endPoll.addEventListener('click', ()=>{
    // - Resets/clears the current poll Display Element
    currentPollDiv.textContent = '';

    // - Pushes the current Pole into an Array of Poll History
    // Calls makePoll which bundles up current state and returns an object of it
    const currentPollData = makePoll(pollQuestion, optionA, optionB, optionAVotes, optionBVotes);

    //push the current state object into our polls array
    pastPollsArr.push(currentPollData);

    // - Displays the Poll History Array in the Poll History Div
    displayAllPolls();

    // - Resets poll Name/Options + Votes - MAKE A RESET FUNCTION?
    resetState();

    //calls displayCurrent Poll to show empty current poll div
    displayCurrentPoll();
});

logOutButton.addEventListener('click', async()=>{
    await logOut();
});


//FUNCTIONS
function displayCurrentPoll() {
    // Clears any current polls in the DOM
    currentPollDiv.textContent = '';

    //Renders HTML - Call renderPoll function
    //make current object of state
    const currentPollData = makePoll(pollQuestion, optionA, optionB, optionAVotes, optionBVotes);

    //calls renderPoll function which returns HTML of Divs
    const pollContainerDiv = renderPoll(currentPollData);

    //appends pollContainer to our existing hardcoded HTML element currentPoll
    currentPollDiv.append(pollContainerDiv);
}

function displayAllPolls() {
        // resets the pastPolls Display Div
    pastPollsDiv.textContent = '';

        // loops through and pushes to a render function which returns HTML divs
    for (let eachPoll of pastPollsArr) {
            // injects HTML Divs into Past Polls Display Div with append
        const pollDiv = renderPoll(eachPoll);
        pastPollsDiv.append(pollDiv);
    }
}

// function which returns an object out of current state
function makePoll(pollQuestion, optionA, optionB, optionAVotes, optionBVotes) {
    return {
        pollQuestion,
        optionA,
        optionB,
        optionAVotes,
        optionBVotes
    };
}

function resetState() {
    pollQuestion = 'Poll Question';
    optionA = 'Option A';
    optionB = 'Option B';
    optionAVotes = 0;
    optionBVotes = 0;
    optionADisplay.textContent = 'Option A';
    optionBDisplay.textContent = 'Option B';
}
