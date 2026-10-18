// DOM elements
const form = document.querySelector("#registrationForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");

const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const message = document.querySelector("#message");

const userList = document.querySelector("#userList");
const totalStat = document.querySelector("#totalStat");
const adultsStat = document.querySelector("#adultsStat");
const minorsStat = document.querySelector("#minorsStat");
const averageStat = document.querySelector("#averageStat");
const showAllButton = document.querySelector("#showAll");
const showAdultsButton = document.querySelector("#showAdults");

// Application state
const manager = createUserManager();
let currentFilter = "all";
//same flag logic as in some as with fridge draft
let editingUserId = null;

// Displays messages on the page.
function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? "error" : "success";
}

// Returns the form to registration mode.
function resetForm() {
  form.reset();
  editingUserId = null;

  submitButton.textContent = "Register";
  cancelButton.classList.add("d-none");
}

// Starts editing the selected user.
function startEditing(user) {
  editingUserId = user.id;

  nameInput.value = user.name;
  emailInput.value = user.email;
  ageInput.value = user.age;

  submitButton.textContent = "Save Changes";
  cancelButton.classList.remove("d-none");

  showMessage("");
  nameInput.focus();
}

// Renders the list of users.
function renderUsers(users) {
  userList.replaceChildren();

  users.forEach(function (user) {
    const { id, name, age, email } = user;

    const li = document.createElement("li");

    const userInfo = document.createElement("span");
    userInfo.textContent = `${name}, ${age} years old - ${email}`;

    const buttons = document.createElement("div");
    buttons.className = "d-flex gap-2";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";

    editButton.addEventListener("click", function () {
      startEditing(user);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      manager.deleteUser(id);

      if (editingUserId === id) {
        resetForm();
      }

      updateUsers();
      showMessage("User deleted successfully");

      console.log("User deleted:", id);
    });

    buttons.append(editButton, deleteButton);
    li.append(userInfo, buttons);
    userList.append(li);
  });
}

// Applies filters and updates the counter.
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

  updateStatistics(users);

  showAllButton.classList.toggle("active", currentFilter === "all");
  showAdultsButton.classList.toggle("active", currentFilter === "adults");
}

// Handles registration and editing.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  showMessage("");

  try {
    const userData = createUser({
      name: nameInput.value,
      email: emailInput.value,
      age: ageInput.value,
    });

    if (editingUserId === null) {
      const user = manager.addUser(userData);

      console.log("User registered:", user);
      showMessage("User registered successfully");
    } else {
      const user = manager.updateUser(editingUserId, userData);

      console.log("User updated:", user);
      showMessage("User updated successfully");
    }

    resetForm();
    updateUsers();
  } catch (error) {
    console.error(error.message);
    showMessage(error.message, true);
  } finally {
    console.log("Registration attempt completed");
  }
});

// Cancels editing.
cancelButton.addEventListener("click", function () {
  resetForm();
  showMessage("");
});

// User list filters
showAllButton.addEventListener("click", function () {
  currentFilter = "all";
  updateUsers();
});

showAdultsButton.addEventListener("click", function () {
  currentFilter = "adults";
  updateUsers();
});

// demo users for testing
const demoUsers = [
  { name: "Anna", email: "anna@example.com", age: 28 },
  { name: "David", email: "david@example.com", age: 15 },
  { name: "Sarah", email: "sarah@example.com", age: 22 },
  { name: "Max", email: "max@example.com", age: 12 },
  { name: "John", email: "john@example.com", age: 35 },
  { name: "Emma", email: "emma@example.com", age: 17 },
  { name: "Olivia", email: "olivia@example.com", age: 41 },
  { name: "Leo", email: "leo@example.com", age: 8 },
];

demoUsers.forEach(function (userData) {
  manager.addUser(createUser(userData));
});

// Calculates statistics for all registered users.
function updateStatistics(users) {
  const total = users.length;

  const adults = users.filter(function (user) {
    return user.age >= 18;
  }).length;

  const minors = total - adults;

  const ageSum = users.reduce(function (sum, user) {
    return sum + user.age;
  }, 0);

  const average = total === 0 ? 0 : ageSum / total;

  totalStat.textContent = total;
  adultsStat.textContent = adults;
  minorsStat.textContent = minors;
  averageStat.textContent = average.toFixed(1);
}

// Initial rendering
updateUsers();
