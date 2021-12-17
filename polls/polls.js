// import functions and grab DOM elements
import { renderPoll } from '../render-utils.js';
import { logOut, createPoll, fetchPolls, getUser } from '../fetch-utils.js';

const pollForm = document.querySelector('#poll-form');
const optionAAdd = document.querySelector('#option-a-add');
const optionBAdd = document.querySelector('#option-b-add');
const endPoll = document.querySelector('#end-poll-button');
const optionADisplay = document.querySelector('#option-a-display');
const optionBDisplay = document.querySelector('#option-b-display');
const currentPollDiv = document.querySelector('#current-poll-div');
const pastPollsDiv = document.querySelector('#past-polls-div');
const logOutButton = document.querySelector('#log-out');


// let state
let question = 'Poll Question';
let optionA = 'Option A';
let optionB = 'Option B';
let optionAVotes = 0;
let optionBVotes = 0;

//calls displayCurrent Poll to show empty current poll div on load
displayCurrentPoll();
// displayAllPolls();

// check if user is not logged in and if so re-direct
checkAuth();

//EVENT LISTENERS

//ON LOAD
window.addEventListener('load', async()=> {
//     - calls displayPolls function which calls fetchPolls and displays them
    displayAllPolls();
});

// SUBMIT FORM
pollForm.addEventListener('submit', (e)=> {
    // - prevents default behavior
    e.preventDefault();

    // - grabs data from form using `new FormData`
    const data = new FormData(pollForm);

    // - update state of Current Poll Question and Options
    question = data.get('question-input');
    optionA = data.get('option-a-input');
    optionB = data.get('option-b-input');


    // - Display that in the DOM
    optionADisplay.textContent = optionA;
    optionBDisplay.textContent = optionB;

    // - clear the form inputs
    pollForm.reset();

    //Display the current poll Div
    displayCurrentPoll();
});

// ADD
optionAAdd.addEventListener('click', ()=>{
    optionAVotes++;
    displayCurrentPoll();
});

// ADD
optionBAdd.addEventListener('click', ()=>{
    optionBVotes++;
    displayCurrentPoll();
});

// END POLL - createPoll in supabase and fetch/re-display
endPoll.addEventListener('click', async()=>{
    //     - Take the current poll state and add it to past polls IN SUPABASE!!! 
    await createPoll(question, optionA, optionB, optionAVotes, optionBVotes);

    // - Displays the polls in the Poll History Div (Display Function)
    displayAllPolls();

    // - Resets state  of poll Name/Options + Votes
    resetState();

    // - Resets the current poll Display Element
    displayCurrentPoll();
});

// LOGOUT
logOutButton.addEventListener('click', async()=>{
    await logOut();
});




// ASYNC FUNCTIONS

// DISPLAY ALL POLLS
async function displayAllPolls() {
    // - Fetch the polls from supabase and display the list (clear the list in the DOM, render, and append)
    
    // - make a fetch/getPolls function using .from .select
    const pastPolls = await fetchPolls();
    
    //     -resets the DisplayDiv
    pastPollsDiv.textContent = '';
    
    //     - loops through and pushes to a render function which returns HTML Divs
    for (let eachPoll of pastPolls) {
        //     - appends HTML Nodes to DisplayDiv
        const pollDiv = renderPoll(eachPoll);
        pastPollsDiv.append(pollDiv);
    }
}

// CHECK IF LOGGED IN - if not re-direct

async function checkAuth() {
    const user = await getUser();
    if (!user) {
        window.location.href = '../';
    }
}



// FUNCTIONS

// DISPLAY CURRENT POLE
function displayCurrentPoll() {
    // Clears any current polls in the DOM
    currentPollDiv.textContent = '';
    
    //make current object of state
    const currentPollObj = makePollObj(question, optionA, optionB, optionAVotes, optionBVotes);
    
    //calls renderPoll function passing current Poll, which returns DOM Node
    const pollContainerDiv = renderPoll(currentPollObj);
    
    //appends pollContainer to our existing currentPoll Element
    currentPollDiv.append(pollContainerDiv);
}


// RESET STATE
function resetState() {
    question = 'Poll Question';
    optionA = 'Option A';
    optionB = 'Option B';
    optionAVotes = 0;
    optionBVotes = 0;
    optionADisplay.textContent = 'Option A';
    optionBDisplay.textContent = 'Option B';
}

// MAKE POLL OBJ - returns object out of current state for render function
function makePollObj(question, optionA, optionB, optionAVotes, optionBVotes) {
    return {
        question,
        optionA,
        optionB,
        optionAVotes,
        optionBVotes
    };
}