I want to build my personalized to do app.
It's a react firebase app.

A. General Structure
1. Useable on both mobile and desktop web. Responsiveness. 
2. To be done in a react project using tsx.
3. Frontend only app. Just React. It uses firebase for the storage.

B. Main features.
1. I want to be able to create Projects. Each Project can then have infinite tasks under them.
2. Each task is a to do. You should be able to add a task to a project, delete it, mark as complete, and filter all todos by status. . 
4. EACH project has the following details... Name, Description, DateCreated, slug(used for routing), id(guid), status(Ongoing/Completed).
5. There should be a view that shows all Projects in cards. And when you click on the card, it then opens up and shows you Tasks under that project as well as sumarry detials of that project like name, date project was created etc.

C. Screen list
1. Project List page. This is the first page you see when the app loads. This is where you show a list of all projects created. If no project created, simply show a text "Create your first project" and a cta button. 
Route: "/"
On this page, you should be able to also filter projects by status. Since Projects have status.
2. Create Project Page. When button is clicked, show the create project screen. A simple input form. Centralized on the screen. 
Route: "/create-project"
3. Project Task List Page. This is where you see all your tasks for a particular project in tabular form and also see the project name at the top.
Route:- "/project/:projectSlug". On this page, you can add a nee task to the project, mark a task as completed. Edit an existing task detail, delete a task, mark task as pending. There should be a back button that can take you right back to the project list page (/). This project task page should also have a filter to show all pending tasks or all tasks or all completed tasks. This is the most important page of the whole project. Cause its where I'll spend the most time. The main focus is that table like list. Something important about this page, when you want to add a new todo or task, if I press Ctrl+N or Cmd+N, it should bring out the Create a Task View. This view is not a new page. Its also not a modal. Its just a view that replaces the table when you're on the project task page. This is to increase my speed when working. Same thing applies for the form, I want to be able to use keyboard controls like tab going to the next input field, and enter submits thw form. 
Once a new task is added to a project, show the table with the new task and status on pending. 
Remember I should be able to edit a task detail. Clicking edit should just open that same form view.


D. Styling CSS
1. Enable dark mode and light mode.
2. Use tailwind.
3. When listing the tasks added under a project, show it in a neat tabular form. Table should have alternative backgrounds for the rows so that its easier to read.
4. Table should also have subtle curves and background shadow. Something to make it look sleek.
5. On the Projects List page, Show a heading that says "Welcome Oghenetega, what do you want to do today?" Then after that, show the projects in cards. Very nice looking sleek cards. With background shadow, curved edges. 
Show the name of the Project, status, and date xreated. Each card is a link to a new page so it should use React Router Link component. When you hover over each card, the back geound shadow should change from grey to like a very subtle light purple shade. And the card should grow a bit when you hover over it.
6. Everything should be centered on screen. Desktop max width of 1280px. This is for all pages.
7. Pages that have filter, filter should be at top right corner while some heading text to the left.
8. The color scheme for the app is as follows
Primary COlour:- #7f56d9
use this as the base and then build around this.

E. Db Structure 
1. Projects Table
Table to hold all projects
Columns
1. Id (guid)
2. Name (string)
3. Slug (unique string)
4. Description
5. OwnerId (guid default 000000-0000-0000-000000000001)
5. Status (Ongoing/Completed) default of ongoing
6. DateCreated (utcTimeStamp(6))

2. Tasks Table
Table to hold all tasks
Columns
1. Id(guid)
2. OrdinalIndex (integer, it starts from 1 and counts upwards)
3. ProjectId (guid. Ties it to the project it belongs to)
3. Name
4. Description
5. Status (Pending, Completed, Archived) default Pending.
6. DateCreated


F. Code Structure
1. Render just an App inside main.tsx
2. Inside App.tsx, create the different routes using Routes and Route component.
3. Create a Pages folder. Then each page will now house its own stuff.
4. Create a components folder for things like Inputs, cards, table, dropdown filter component, button
5. I have not used firebase before so you can use a standard project and folder structure for it. However make use of realtime Database, not firestor.
e.g import { getDatabase, ref, set, push } from "firebase/database";
6. I think you can also create reusable functions that we can use to write, read, update and delete stuff from the firebase realtime db.
7. Add he firebase config file and the env file also. I'll add the configs in the env file.
8. Create a fuction that generates slug from the name of the project/task. Function can add a random 6 character at the end, e.g 
if project name = 'Random Work', slug = 'random-work'ffd54d'
9. Do me a favour and make a list of all the files you have created. So that I will just follow the list and create them accordindly. You can also indicate the file path for the files.
I write react so I shouold be able to follow most of what you're doing. But still clearly point it out. so I can follow it systematically.



G. Considerations