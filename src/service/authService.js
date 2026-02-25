
const Parse = window.Parse;


export async function register({username, email, password}) {
    try {
        const user = new Parse.User();
        user.set("username", username);
        user.set("email", email);
        user.set("password", password);

        const newUser = await user.signUp();

        return {
            id: newUser.id,
            username: newUser.get("username"),
            email: newUser.get("email"),
            createdAt: newUser.createdAt,
        };
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
}

export async function logIn({email, password}) {
    try {
        const user = await Parse.User.logIn(email, password);
        return {
            id: user.id,
            username: user.get("username"),
            email: user.get("email"),
            createdAt: user.createdAt,
        };
    } catch (error) {
        console.error("Error logging in: ", error);
        throw error;
    }
}

export function getCurrentUser() {
    try {
        const user = Parse.User.current();

        if (!user) {
            return null;
        }
        return {
            id: user.id,
            username: user.get("username"),
            email: user.get("email"),
            createdAt: user.createdAt,
        };
    } catch (error) {
        console.error("Error getting current user: ", error);
        throw error;
    }
}

export async function logOut() {
    try {
        await Parse.User.logOut();
    } catch (error) {
        console.error("Error logging out: ", error);
        throw error;
    }
}
