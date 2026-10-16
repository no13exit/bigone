// DOM elements

const form = document.querySelector("#registrationForm");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const errorMessage = document.querySelector("#errorMessage");
const userList = document.querySelector("#userList");

const userCount = document.querySelector("#userCount");

const showAllButton = document.querySelector("#showAll");
const showAdultsButton = document.querySelector("#showAdults");

const manager = createUserManager();
let currentFilter = "all";

// Render users without modifying the stored data.

function renderUsers(users) {
  userList.replaceChildren();

  users.forEach(function ({ id, name, age }) {
    const li = document.createElement("li");

    li.textContent = `${name}, ${age} years old`;

    const button = document.createElement("button");
    button.textContent = "Delete";

    button.addEventListener("click", function () {
      manager.deleteUser(id);
      updateUsers();
    });

    li.append(button);

    userList.append(li);
  });
}

// Apply the selected filter and update the user counter.
function updateUsers() {
  const users = manager.getUsers();

  if (currentFilter === "adults") {
    const adults = users.filter(function (user) {
      return user.age >= 18;
    });

    renderUsers(adults);
  } else {
    renderUsers(users);
  }

  userCount.textContent = users.length;
}

// Handle registration and display validation errors.

form.addEventListener("submit", function (event) {
  event.preventDefault();

  errorMessage.textContent = "";

  try {
    const name = nameInput.value;
    const age = ageInput.value;

    if (age.trim() === "") {
      throw new Error("Age is required");
    }

    const user = createUser({
      name: name,
      age: Number(age),
    });

    manager.addUser(user);
    updateUsers();

    console.log("User registered:", user);

    form.reset();
  } catch (error) {
    console.error(error.message);
    errorMessage.textContent = error.message;
  } finally {
    console.log("Registration attempt completed");
  }
});

showAllButton.addEventListener("click", function () {
  currentFilter = "all";
  updateUsers();
});

showAdultsButton.addEventListener("click", function () {
  currentFilter = "adults";
  updateUsers();
});
