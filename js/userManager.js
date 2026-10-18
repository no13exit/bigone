
// Manages users with private state stored in a closure.
function createUserManager() {
    const users = [];

    function addUser(user) {

        //email should be unique
        const exists = users.some(function(existingUser) {
            return existingUser.email === user.email;
        });

        if (exists) {
            throw new Error("Email already registered");
        }

        const newUser = {
            ...user,
            id: crypto.randomUUID()
            // or you can use Date.now() or any other method to generate a unique ID
            //  id: Date.now().toString()
        };

        users.push(newUser);
        return newUser;
    }

    // Returns copies of users.
    function getUsers() {
        return users.map(function(user) {
            return { ...user };
        });
    }

    function deleteUser(id) {
        const index = users.findIndex(function(user) {
            return user.id === id;
        });

        if (index !== -1) {
            users.splice(index, 1);
        }
    }

    // Updates an existing user without changing the ID.
    function updateUser(id, updatedData) {
        const index = users.findIndex(function(user) {
            return user.id === id;
        });

        if (index === -1) {
            throw new Error("User not found");
        }

        const exists = users.some(function(user) {
            return user.email === updatedData.email && user.id !== id;
        });

        if (exists) {
            throw new Error("Email already registered");
        }

        users[index] = {
            ...users[index],
            ...updatedData,
            id
        };

        return users[index];
    }

    return {
        addUser,
        getUsers,
        deleteUser,
        updateUser
    };
}
