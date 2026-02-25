import { useState } from 'react';

export async function register({username, email, password}) {
    const Parse = window.Parse;
    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    user.set("displayName", username);

    const newUser = await user.signUp();

    return {
        id: newUser.id,
        displayName: newUser.get("displayName"),
        email: newUser.get("email"),
        createdAt: newUser.createdAt,
    };
}


export async function logIn({email, password}) {
    const Parse = window.Parse;
    const user = await Parse.User.logIn(email, password);

        return {
            id: user.id,
            displayName: user.get("displayName"),
            email: user.get("email"),
            createdAt: user.createdAt,
        };
}

export function getCurrentUser() {
    const Parse = window.Parse;
    const user = Parse.User.current();

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        displayName: user.get("displayName"),
        email: user.get("email"),
        createdAt: user.createdAt,
    };
}

export async function logOut() {
    const Parse = window.Parse;
    await Parse.User.logOut();
}

