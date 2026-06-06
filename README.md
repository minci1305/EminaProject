## How to Run ##
npm run dev (in terminal)

### Tasks from Claude ###

#### Task 1: Press enter to add a task ####
Inside of ToDoList.jsx, I added an onKeyDown handler with the conditional e.key === 'Enter' to make enable enter button on keyboard.

#### Task 2: Disable Add button when input is empty ####
In ToDoList.jsx, I added disabled={!input.trim()} in the button element and then deleted the alert statement in handleAddClick(). I also created button:disabled in App.css, making the button grey as well as adding 'enabled' to button:hoover:enabled such that the hoover doesn't trigger anything while the input is empty.

#### Task 3: Show a loading spinner while tasks load ####
