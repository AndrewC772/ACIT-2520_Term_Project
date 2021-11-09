const userController = require ("./userController")

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: userController.getUserById(1).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userController.getUserById(1).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userController.getUserById(1).reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: userController.getUserById(1).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userController.getUserById(1).reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userController.getUserById(1).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
	let reminderToFind = req.params.id
	let searchResult = userController.getUserById(1).reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		searchResult.title = req.body.title
		searchResult.description = req.body.description
		if (req.body.completed == 'true') {
			searchResult.completed = true
		} else {
			searchResult.completed = false
		}
		res.redirect("/reminders")
	} else {
    console.log("Search failed")
		res.redirect("/reminders")
	}
  },

  delete: (req, res) => {
    // Implement this code
	let reminderToFind = req.params.id
	let searchResult = userController.getUserById(1).reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		let Array_Postion = userController.getUserById(1).reminders.indexOf(searchResult)
		userController.getUserById(1).reminders.splice(Array_Postion, 1)
		res.redirect("/reminders")
	} else {
    console.log("Search failed")
		res.redirect("/reminders")
	}
  },
};

module.exports = remindersController;
