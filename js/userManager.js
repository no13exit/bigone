function createUserManager() {
  const users = [];

  function addUser(user) {
    users.push(user);
  }

  function getUsers() {
    return [...users];
  }

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
