import { Parse } from "../parseClient";

export async function signUp({ username, email, password }) {
    if (!username || !password || !email) {
        throw new Error("Missing required fields");
    }

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);


    try {
        const newUser = await user.signUp();
        return {
            id: newUser.id,
            username: newUser.get("username"),
            email: newUser.get("email"),
            createdAt: newUser.createdAt,
        };
    } catch (e) {
        console.error("Error signing up: ", e);
        throw e;
    }
}

export async function logIn({username, password}) {
    if (getCurrentUser()) {
        return getCurrentUser();
    }



    try {
        const user = awaitParse.User.logIn(username, password);

        return {
            id: user.id,
            username: user.get("username"),
            password: user.get("password"),
            email: user.get("email"),
            createdAt: user.createdAt,
        };
    } catch (e) {
        console.error("Error logging in: ", e);
        throw e;
    }
}

export function getCurrentUser() {
    const currentUser = Parse.User.current();

    if (!currentUser) {
        return null;
    }

    return {
        id: currentUser.id,
        username: currentUser.get("username"),
        password: currentUser.get("password"),
        email: currentUser.get("email"),
        createdAt: currentUser.createdAt,
    };
}

export function logOut() {
    try {
        Parse.User.logOut();
    } catch (e) {
        console.error("Error logging out: ", e);
    }
}

export function isAuthenticated() {
    const currentUser = Parse.User.current();
    return !!currentUser;
}

export function getUserEmail() {
    const currentUser = Parse.User.current();
    return currentUser ? currentUser.get("email") : null;
}
