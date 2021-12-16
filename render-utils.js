export function renderPoll(currentPollData) {

    // Creates HTML elements
    const pollContainerDiv = document.createElement('div');
    const questionEl = document.createElement('p');
    const bothOptionsDiv = document.createElement('div');
 
     //Sets elements text content to current state
    questionEl.textContent = currentPollData.pollQuestion;
 
     // Adds class lists to elements for styling
    pollContainerDiv.classList.add('poll-container');
     //add styling to outer container element
    bothOptionsDiv.classList.add('both-options-container');
 
     
     //CALL twice renderOption with optionsA and B to generate Divs
    const optionAContainerDiv = renderOption(currentPollData.optionA, currentPollData.optionAVotes);
    const optionBContainerDiv = renderOption(currentPollData.optionB, currentPollData.optionBVotes);
     
     //Appends OptionA and OptionB divs to bothOptions outer container div
    bothOptionsDiv.append(optionAContainerDiv, optionBContainerDiv);
 
     //Appends Question and bothOptions container to pollContainer
    pollContainerDiv.append(questionEl, bothOptionsDiv);
 
     //return the HTML tag
    return pollContainerDiv;
}
 
function renderOption(option, votes) {
 // -- take in option A and votes A OR option B votes B
 // -- takes those values
 // -- creates p elements + container Div
 
    const optionContainerDiv = document.createElement('div');
    const optionEl = document.createElement('p');
    const optionVotesEl = document.createElement('p');
 
 //sets text content of P elements to state values
    optionEl.textContent = option;
    optionVotesEl.textContent = votes;  
 
 //adds classes for styling
    optionContainerDiv.classList.add('option-container');
 
 // -- appends them in a container div
    optionContainerDiv.append(optionVotesEl, optionEl);
 
 // -- returns the container div
    return optionContainerDiv;
}