
// Manages users using a private array stored in a closure.


function createUserManager() {
  const users = [];

  function addUser(user) {
    users.push(user);
  }

// Returns a copy to prevent changes to the internal array.

  function getUsers() {
    return [...users];
  }

  // Removes a user by their unique ID.
  function deleteUser(id) {
    const index = users.findIndex(function (user) {
      return user.id === id;
    });

    if (index !== -1) {
      users.splice(index, 1);
    }
  }

  return {
    addUser,
    getUsers,
    deleteUser
  };
}
