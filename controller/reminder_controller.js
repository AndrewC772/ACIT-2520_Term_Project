const userController = require ("./userController")
const express = require("express");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.find(reminders => reminders.id == reminderToFind ).length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
	let reminderToFind = req.params.id
	let searchResult = req.user.reminders.find(reminders => reminders.id == reminderToFind )
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
	let searchResult = req.user.reminders.find(reminders => reminders.id == reminderToFind )
	if (searchResult != undefined) {
		let Array_Postion = req.user.reminders.indexOf(searchResult)
		req.user.reminders.splice(Array_Postion, 1)
		res.redirect("/reminders")
	} else {
    console.log("Search failed")
		res.redirect("/reminders")
	}
  },
};

module.exports = remindersController;