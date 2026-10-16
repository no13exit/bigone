
let nextId = 1;

// Validates user data and creates a user with a unique ID.

function createUser({ name, age, ...otherData }) {

    if (!name.trim()) {
        throw new Error("Name is required");
    }

    name = name.trim();

if (age === "" || age === null || age === undefined) {
    throw new Error("Age is required");
}

age = Number(age);

if (!Number.isInteger(age) || age < 0 || age > 120) {
    throw new Error("Invalid age");
}

const user = {
    ...otherData,
    id: nextId++,
    name: name,
    age: age
};

return user;


}




