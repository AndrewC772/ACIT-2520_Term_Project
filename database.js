let Database = [  
    {
    id: 1,
    name: "Jimmy Smith",
    role: "user",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}, {id: 1, title: "test2", description: "test1", completed: true}],
    profile_pic: ""
  },
  {
    id: 2,
    name: "Johnny Doe",
    role: "user",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
    profile_pic: ""
  },
  {
    id: 3,
    name: "Jonathan Chen",
    role: "user",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}],
    profile_pic: ""
  },
  {
    id: 4,
    name: "test",
    role: "Admin",
    email: "test@test",
    password: "test",
    reminders: [{id: 1, title: "test1", description: "test1", completed: false}, {id: 1, title: "test2", description: "test1", completed: true}],
    profile_pic: ""
  }
]

module.exports = Database;