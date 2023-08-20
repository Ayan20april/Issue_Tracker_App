const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//to store the list of issues
let issues = [];

//define routes
app.get('/', (req, res) => {
  res.render('index', { issues });
});

app.get('/issue/:id', (req, res) => {
  const issueId = req.params.id;
  const issue = issues.find(issue => issue.id === parseInt(issueId));
  res.render('issue', { issue });
});

// Creating a new issue and adding it to the 'issues' array
// Redirecting back to the main page
app.post('/create', (req, res) => {
  const { title, description } = req.body;
  const id = issues.length + 1;
  const newIssue = { id, title, description, status: 'Open' };
  issues.push(newIssue);
  res.redirect('/');
});

// Updating the status of a specific issue
// Redirecting back to the issue details page
app.post('/update/:id', (req, res) => {
  const issueId = parseInt(req.params.id);
  const { status } = req.body;
  const issue = issues.find(issue => issue.id === issueId);
  if (issue) {
    issue.status = status;
  }
  res.redirect(`/issue/${issueId}`);
});

// Deleting a specific issue
// Redirecting back to the main page
app.post('/delete/:id', (req, res) => {
  const issueId = parseInt(req.params.id);
  issues = issues.filter(issue => issue.id !== issueId);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Issue tracker app is running on http://localhost:${port}`);
});
