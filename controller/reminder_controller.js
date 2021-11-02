let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToUpdate = req.params.id;
    let reminder = {
      id: reminderToUpdate - 1,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    }
    let reminderId = reminderToUpdate - 1
    database.cindy.reminders[reminderId] = reminder
    res.render("reminder/single-reminder", { reminderItem: database.cindy.reminders[reminderId] })
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id;
    let reminderId = reminderToDelete - 1
    delete database.cindy.reminders[reminderId]
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
