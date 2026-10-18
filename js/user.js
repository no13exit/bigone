
// Validates and normalizes user data.
function createUser({ name, age, email, ...otherData }) {
    if (!name || !name.trim()) {
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

    if (!email || !email.trim()) {
        throw new Error("Email is required");
    }

    email = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email");
    }

    return {
        ...otherData,
        name,
        age,
        email
    };
}
