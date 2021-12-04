const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  console.log(user)
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  console.log("Is this triggered? getUserById")
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  console.log(user.password)
  return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
  let user  = userModel.findByIdGithub(profile.id, profile);
  if (user) {
    return user;
  } 
  return null;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate
};
