# Integration Engineer Test

We appreciate your interest in the Integration Engineer role at our company. This test helps us understand your skills in creating a Node.js backend API and a ReactJS frontend. You should finish the test within a few hours. Please read the instructions carefully.

## Task Overview:

Your task is to build a simple task management application. This template offers a basic setup for a React frontend using Vite, which connects to a Node/Express backend. Users should be able to view, create, update, and delete tasks.

There are different parts to this exercise:

1. Set up the backend and frontend, resolving any issues that may arise (some issues might not have been noticed by the original developer since 'it works locally').
2. Complete the endpoints for task creation and deletion.
3. Implement missing functions in the React frontend to interact with the new endpoints for task creation and deletion.
4. Develop a new endpoint in the Express app for updating tasks. Create a UI allowing users to update tasks and communicate with this new endpoint.
5. Update the CSS to improve the usability of the solution.

*Additional Information*

* Tasks should be stored temporarily in memory; permanent storage is not necessary.
* Prevent creating or updating tasks with empty titles or descriptions. Display an error if users attempt to submit an invalid task. (Your backend should handle this check and return an error.)
* No guidance is available from the previous developer on setting up the project on a new machine. You'll need to use the existing files to figure it out, considering possible mistakes.
* The backend is in JavaScript, while the frontend React code is in a .tsx file. Make sure your work is valid TypeScript.
* Enable CORS support in the API to permit cross-origin requests.
* The app's rudimentary styling by the previous developer can be improved for better user experience.
* BONUS: If you can optimize the React app's rendering for efficiency, feel free to make changes.

*Submission Guidelines*

* Fork this GitHub repository to your own GitHub account.
* Develop the backend and frontend using the provided directory structure.
* Edit this README below to explain how to run both the backend and frontend.
* Once done, share the link to your forked repository via email.

*Evaluation Criteria*

* Functionality: Does the app meet the requirements and work error-free?
* Code Quality: Is the code well-structured, modular, and easy to understand?
* API Design: Did you design the API in a RESTful way? Is error handling and validation effective?
* Frontend Design: Is the frontend user-friendly, responsive, and visually appealing?
* Git Usage: Are your commits meaningful and code changes well-tracked?
* Documentation: Are instructions provided for setting up the app on a new machine?

Use this opportunity to showcase your skills. If you see fit, add extra features or improvements.

Please note that this test aims to be completed in a few hours. However, quality work is more important than speed. If you have questions, feel free to email us.

Best wishes, and we're excited to review your submission!

Regards,
The Duda Solutions Engineering Team

## Add any instructions to get your submission running below this line.

Project Setup and Running Instructions

These instructions will guide you through setting up and running a project consisting of a server and a frontend application.

Setup:

1. Clone the Project Repository:

   `git clone https://github.com/danielmorbeck/integration-engineer-take-home.git`

   `cd integration-engineer-take-home`

2. Install Dependencies:

   Install the project dependencies using npm. This command will install the dependencies for both the server and the frontend.

   `npm install`

   `cd frontend && npm install`

Running the Project:

Server:

1. Start the Server:

   To start the server, run the following command from the root directory of the project:

   `node index.js`

   This will launch the server, and it will listen for incoming requests.

Frontend Application:

1. Navigate to the Frontend Directory:

   Change your working directory to the frontend directory using the following command:

   `cd frontend`

2. Start the Development Server:

   To start the development server for the frontend application, run the following command:

   `npm run dev`

   This will compile and run the frontend application in development mode. You will see output indicating that the development server is running.

3. Access the Application:

   Open a web browser and navigate to the local url provided by Vite.

   e.g. `http://localhost:5173/`

Project Shutdown:

To stop the server and the frontend development server, you can use the following steps:

1. Terminate the Server:

   In the terminal where the server is running (root directory of the project), press Ctrl + C to stop the server.

2. Terminate the Frontend Development Server:

   In the terminal where the frontend development server is running (frontend directory), press Ctrl + C to stop the development server.

That's it! You have successfully set up and run the project. You can now test the application locally.
