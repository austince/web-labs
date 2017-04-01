/**
 * Created by austin on 2/10/17.
 * I pledge my honor that I have abided by the stevens honor system.
 */

const todo = require('./lib/todo');


let firstId;
let toCompleteId;

// Start promise chain
todo.createTask(
      'Ponder Dinosaurs',
      'Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?'
  ).then((task) => {
    // Log task, the create new task
    console.log(task);
    firstId = task._id;
    return todo.createTask('Play Pokemon with Twitch TV', 'Should we revive Helix?');
  }).then((task) => {
    // Query all tasks and log them
    toCompleteId = task._id;
    return todo.getAllTasks();
  })
    .then(console.log)
    // Remove first task
    .then(() => todo.removeTask(firstId))
    // Query all and log
    .then(todo.getAllTasks)
    .then(console.log)
    // Complete remaining task
    .then(() => todo.completeTask(toCompleteId))
    // Query and log the remaining tasks
    .then(todo.getAllTasks)
    .then(console.log)
    .then(() => {
      process.exit(0);
    });

