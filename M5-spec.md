M5 Specifications

1. Navigation Toggle

Trigger: The user clicks the menu button.
Expected DOM change: The navigation menu either opens or closes.
Edge Cases: 

The user clicks the button multiple times.

The user clicks a navigation link.

The browser changes from mobile to desktop size.

if the menu button or navigation menu is missing, stop the script safely.

Pressing enter or space on the button should rather open or close the menu.

Clicking outside the open menu should close it.

Changing to desktop screen size should close the mobile menu.

Clicking a navigation link should allow normal navigation.

Refereshing the page should leave the mobile menu closed.

Pseudocode:

a. Find the menu button and navigation menu.

b. When the button is clicked, check if the menu is open.

c. If it is open, close it.

d. If it is closed, open it.

e. Close the menu when the user selects a navigation link.


2. Dark Mode

Trigger: The user clicks the dark mode button.
Expected DOM Change: The website switches between light and dark theme.
Edge Cases:

The user clicks the button repeatedly.

The user refreshes the page.

No saved theme preference exists.

If the saved theme value is invalid, use the default light theme. 

If the browser cannot save the theme preference, allow dark mode to work without saving it.

If the user opens the website in another browser or device, use the default theme if no saved preference is available.

If the operating system prefers dark mode, use the light theme by default unless the user has a valid saved preference.

If the dark mode button cannot be found, skip the toggle functionality without breaking the website.

Pressing Enter or Space on the dark mode button should toggle the theme using normal keyboard activation.

Pseudocode:
a. Find the dark mode button.

b. Check the current theme.

c. Switch to the opposite theme when clicked.

d. Save the selected theme.

e. Restore the saved theme when the page reloads.

3. Dynamic content from array

Trigger: The content of the portfolio loads
Expected DOM change: Project cards appear on the page using information from an array
Edge Cases:
The array is empty.

Some project information is missing.

A project image does not load.

If the project container cannot be found, stop rendering projects without breaking the rest of the website.

If the array contains duplicate projects with the same unique ID, display each project only once.

If an array entry is invalid or is not a project object, skip that entry.

If a project title or description is extremely long, display it without breaking the page layout.

If a project link is missing or invalid, display the project information without a clickable link.

If the array contains many projects, render them efficiently without unnecessarily repeating DOM updates.

If a project image loads slowly, display the card while the image loads.

If an image fails to load, display alternative text or a placeholder image.

Pseudocode:
a. Prepare an array containing project information.

b. Find the project container.

c. Check if the array contains projects.

d. If it is empty, display a message.

e. Otherwise, create a card for each project.

f. Display all project cards inside the container.

4. Contact form validation:

Trigger: The user submits its contact form.
Expected DOM change: Error messages appear for invalid information, or a success message appears when the information is valid.
Edge Cases:

Required fields are empty.

The email address is invalid.

A field contains only spaces.

The user submits the form multiple times.

If the form or a required field cannot be found, stop validation safely.

If the email contains leading or trailing spaces, remove those spaces before validating it.

If the name, email, or message is too long, display an appropriate validation error.

Allow normal punctuation and special characters in names and messages.

If a submission is already being processed, prevent duplicate submissions.

If the success message cannot be displayed, do not clear the form.

If clearing the form fails, allow the user to clear the fields manually.

If the user refreshes or leaves the page, do not claim that the message was sent unless a working submission service confirms it.

If the user corrects an invalid field, remove its error message when the field becomes valid.

If the user submits the form by pressing Enter, validate it normally.

Pseudocode:
a. Find the contact form and its fields.

b. Check the form when the user submits it.

c. Prevent the page from reloading.

d. Check if required fields are empty.

e. Check if the email address is valid.

f. Display error messages for invalid fields.

g. If all fields are valid, display a success message.

h. Clear the form after successful handling.