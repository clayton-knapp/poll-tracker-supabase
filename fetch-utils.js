const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUyNDEzNiwiZXhwIjoxOTU1MTAwMTM2fQ.RoJQToswNQTg_HpYFxDJfQsgthtgQ_E6eOq2Hq3CkMo';


const SUPABASE_URL = 'https://kxgrnsxvarsccdnmwtci.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// CREATE/INSERT POLL
export async function createPoll(question, optionA, optionB, optionAVotes, optionBVotes) {
    const response = await client
        .from('polls')
        .insert({
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionAVotes: optionAVotes,
            optionBVotes: optionBVotes 
        });

    return response.data;
}

// FETCH/GET POLLS
export async function fetchPolls(){
    const response = await client
        .from('polls')
        .select();
    
    return response.data;
}

// GET USER AUTH INFO
export async function getUser(){
    const response = await client
        .auth
        .session();
    
    console.log(response);
    return response; // response redirects b/c it evaluates as false, but response.user doesnt - why?
}



//SIGN UP
export async function signUp(email, password) {
    const response = await client
        .auth
        .signUp({ 
            email, 
            password, 
        });

    return response.user;
}

//LOG IN
export async function logIn(email, password) {
    const response = await client
        .auth
        .signIn({ 
            email,
            password, 
        });

    return response.user;
}

//LOG OUT
export async function logOut() {
    await client.auth.signOut();
    window.location.href = '../';
}

//DELETE POLL
export async function deletePoll(eachPoll){
    await client
        .from('polls')
        .delete()
        .eq('id', eachPoll.id);
}