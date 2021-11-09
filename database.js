let Database = [  
    {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}, {id: 1, title: "test2", description: "test1", completed: true}]
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
  },
  {
    id: 4,
    name: "test",
    email: "test@test",
    password: "test",
    reminders: [{id: 1, title: "test1", description: "test1", completed: false}, {id: 1, title: "test2", description: "test1", completed: true}]
  }
]

module.exports = Database;