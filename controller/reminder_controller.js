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
	let reminderToFind = req.params.id
	let searchResult = database.cindy.reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		searchResult.title = req.body.title
		searchResult.description = req.body.description
		console.log(req.body.completed, typeof(req.body.completed))
		if (req.body.completed == 'true') {
			searchResult.completed = true
		} else {
			searchResult.completed = false
		}
		res.render("reminder/index", { reminders: database.cindy.reminders})
	} else {
		res.render("reminder/index", { reminders: database.cindy.reminders})
	}
  },

  delete: (req, res) => {
    // Implement this code
	let reminderToFind = req.params.id
	let searchResult = database.cindy.reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		let Array_Postion = database.cindy.reminders.indexOf(searchResult)
		database.cindy.reminders.splice(Array_Postion, 1)
		res.render("reminder/index", { reminders: database.cindy.reminders})
	} else {
		res.render("reminder/index", { reminders: database.cindy.reminders})
	}
  },
};

module.exports = remindersController;
