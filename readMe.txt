project by -PankajDevlops
(College Mini-Project)

General Understanding:
Purpose: This code manages a form for registering employees, storing their details locally, displaying them in a table, and allowing updates or deletions.

querySelector: It helps find HTML elements by CSS selectors. addEventListener attaches an event handler, and querySelectorAll selects multiple elements that match a CSS selector.

localStorage: It's used to store data on the user's browser. In this code, it's utilized to persist employee details even after the page is refreshed or closed.

Event Handling and DOM Manipulation:
"Add Employee" Button: Clicking this button opens a modal by adding the "active" class to it.

Modal Display and Close: The modal is shown by adding the "active" class and closed by removing it via JavaScript.

Form Input Reset: After registration, the form inputs are cleared using the reset() method.

Data Storage and Retrieval:
localStorage: It's used to store employee data in the form of an array, converting it to a string (JSON) and storing/retrieving it using setItem and getItem.

Displaying Data: The getDataFromLocal() function fetches stored data and dynamically populates a table with employee details.

Deletion Mechanism: When a user clicks the delete button, it prompts a confirmation dialog. If confirmed, it removes the data from the array and updates the localStorage.

Update Functionality:
"Edit" Functionality: Clicking "Edit" fetches the user's data, populates the form, and allows modification before updating it.

updateBtn: This button updates employee data after editing, altering the existing entry in the array and updating localStorage.

Image Processing and Search:
Uploading Profile Picture: It reads the image file, checks its size, and displays it. If the file size is too large, it prompts an alert.

Search Functionality: It filters table data based on user input, checking if the input matches any employee details.

Error Handling and Confirmation:
File Size Error Handling: Notifies the user if the uploaded image exceeds the size limit via an alert.

Confirmation Alerts: Uses swal to confirm deletion actions, ensuring users are aware of irreversible actions.

Clearing Data:
"Clear All Data" Button: It deletes all stored data after confirming the user's intention via a checkbox.

Confirmation Check: Before deleting data, it checks if the user has confirmed by checking the checkbox.
