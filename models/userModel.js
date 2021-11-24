const database = require("../database")
const request = require('request');

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByIdGithub: (id, profile) => {
    console.log(profile.id, profile.username, profile.site_admin)
    let user = database.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      request('https://api.unsplash.com/photos/random/?client_id=6C3Sb8DdA3n2_vIhdEA_II_ENcwFrFhp3f7wG1acklk', { json: true }, (err, res1, random_image) => {
        if (err) { 
          return console.log(err); 
        } else {
          let profile_image = random_image.urls.thumb
          database.push(
            {
              id: profile.id,
              name: profile.username,
              role: "user",
              reminders: [],
              profile_pic: profile_image
            }
          )
          console.log(database)
          let user = database.find((user) => user.id === id);
          return user
        }
      })
    }
  },
};

module.exports = { database, userModel };
