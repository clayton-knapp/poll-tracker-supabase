// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderPoll } from '../render-utils.js';
import { fetchPolls, logIn } from '../fetch-utils.js';

const test = QUnit.test;

test('test renderPoll function, see if it returns expects DOM node', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div class="poll-container"><p>Fav Fruit?</p><div class="both-options-container"><div class="option-container"><p>2</p><p>Apple</p></div><div class="option-container"><p>4</p><p>Orange</p></div></div></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const testPoll = {
        question: 'Fav Fruit?',
        optionA: 'Apple',
        optionB: 'Orange',
        optionAVotes: 2,
        optionBVotes: 4,
    };
    const actual = renderPoll(testPoll);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected, 'returns the DOM node: "<div class="poll-container"><p>Fav Fruit?</p><div class="both-options-container"><div class="option-container"><p>2</p><p>Apple</p></div><div class="option-container"><p>4</p><p>Orange</p></div></div></div>"');
});


test('attempt to test async fetchPolls function', async(expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = [];
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = await fetchPolls();

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual, expected, 'fetchPolls returns an empty array');

    //ATTEMPT 2
    //Arrange
    // Set up your arguments and expectations
    const expected2 = [{
        created_at: '2021-12-17T22:33:31.314984+00:00',
        id: 21,
        optionA: 'Red',
        optionAVotes: 3,
        optionB: 'Smoke Blue',
        optionBVotes: 3,
        question: 'Fav Color?',
        user_id: '5bf721a7-6b05-4d41-bbb7-15343f681d66'
    }];
    
    //Act 
    // Call the function you're testing and set the result to a const
    await logIn('clay@man.com', '111111');
    const actual2 = await fetchPolls();

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.deepEqual(actual2, expected2, 'fetchPolls returns an the object for that user');
});







