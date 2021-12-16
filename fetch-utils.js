const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUyNDEzNiwiZXhwIjoxOTU1MTAwMTM2fQ.RoJQToswNQTg_HpYFxDJfQsgthtgQ_E6eOq2Hq3CkMo';


const SUPABASE_URL = 'https://kxgrnsxvarsccdnmwtci.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);



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