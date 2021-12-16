## The Golden Rule: 

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1) **Make a drawing of your app. Simple "wireframes"**
1) **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1) **For each HTML element ask: Why do I need this? (i.e., "we need div to display the results in")** 
1) **Once we know _why_ we need each element, think about how to implement the "Why" as a "How" (i.e., `resultsEl.textContent = newResults`)**
1) **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1) **Think about how to validate each of your features according to a Definition of Done. (Hint: console.log usually helps here.)**
1) **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:
- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model. 
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need? 
  - What are the key/value pairs? 
  - What arrays might you need? 
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be resused?)


DANI'S SETUP

# Sign up / sign in page

## HTML setup
- Sign up
  - form: username input, password input and button
- Sign in
  - form: username input, password input and button

## Events
### Login / sign in
  - Once the user hits submit on the form . . .
  - prevent default behavior
  - get the username and password from the form (`new FormData(form)`)
  - "log in the user" - make a function using .signIn and pass username and password
    - consult the supabase docs to find:
```js 
  const response = await client.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})
```
- redirect the user to the protected page with their data
    - use getUser function with client.auth.session();
    - check if it returns something, if true then redirect
    - re-direct with location.replace('./games');

### Sign up
  - Once the user hits submit on the form . . .
- prevent default behavior
  - get the username and password from the form (`new FormData(form)`)
  - "log in the user"
    - consult the supabase docs to find:
```js 
  const response = await client.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
```
- redirect the user to the protected page with their data
    - use getUser function with client.auth.session();
    - check if it returns something, if true then redirect
    - re-direct with location.replace('./games');

NEED THESE SUPABASE AUTH FUNCTIONS IN FETCH UTILS
- checkAuth - returns to login page if not logged in (bad auth) (must run on polls page)
- redirectIfLoggedIn - automatically redirects to poll page if logged in (must tun on login page)
-signUp - duh auth.signUp
- signIn - duh - auth.signIn
- logout - auth.signOut
- getUser - .auth.session (called by checkAuth and redirect of .auth.session included in them?)


## Polls Page


### HTML Setup
- Form for our new poll
- Buttons to add and subtract votes
- A div to inject current poll into
- A div to inject past polls into

### Event
- on load, 
  - go fetch all this user's past polls 
    -call getPolls function
  - display them
    - calls displayPolls function

- On click vote
  - increment the state of the vote for that option,
  - then display the change

- On submit add question and options button
    - prevents default behavior
    - grabs data from form using `new FormData`
    - update state of Current Poll Question and Options
    - Display that in the DOM
    - initialize the form inputs

- On click of Finish Poll
  - Take the current poll state and add it to past polls IN SUPABASE!!! 
        - make a createPoll function and use .insert, bass it currentPole Obj
  - Re-fetch the polls from supabase and redisplay the list (clear the list in the DOM, render, and append)
    - make a fetch/getPolls function using .from .select
    - set the returned array to an array in state to loop through or send it to the display function
    - Displays the polls in the Poll History Div (Display Function)
        -resets the DisplayDiv
        - loops through and pushes to a render function which returns HTML Divs
        - appends HTML Nodes to DisplayDiv
    - Resets state  of poll Name/Options + Votes
    - Resets the current poll Display Element - displayCurrent function?




  MY OLD POLL TRACKER SETUP 

  HTML SETUP
6 Buttons
    - Create Form
        - 3 Inputs, 1 poll question, 2 options
        - Button
    -option A add
    -option B add
    -option A undo
    -option B undo
    -End poll
- Current Pole Div
    - has name of current Pole
    - option A + option B
    - option A votes + option B votes
-Past Polls
    - empty div to inject closed polls/history list

EVENTS

Form Submit/Create Poll
    - prevents default behavior
    - grabs data from form using `new FormData`
    - update state of Current Poll Question and Options
    - Display that in the DOM
    - initialize the form inputs

OptionA/B Add/Subtract Buttons
    - increments/decrements for that option
    - Updates the DOM

End Poll Button
    - Resets the current poll Display Element
    - Pushes the current Pole into an Array of Poll History
    - Displays the Poll History Array in the Poll History Div
        -resets the DisplayDiv
        - loops through and pushes to a render function which returns HTML Divs
        - injects HTML Divs into Poll History Display Div with looping and append?
    - Resets poll Name/Options + Votes



Functions

renderOption(option, votes)
-- what does render option do?
-- take in option A and votes A OR option B votes B
-- takes those values
-- creates p elements
-- appends them in a container div
-- returns the container div
