const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample data store for issues
let issues = [];

app.get('/', (req, res) => {
    res.render('index', { issues });
});

app.get('/issue/:id', (req, res) => {
    const id = req.params.id;
    const issue = issues.find(issue => issue.id === id);
    res.render('issue', { issue });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, description } = req.body;
    const id = Date.now().toString(); // Simplified unique ID generation

    const newIssue = {
        id,
        title,
        description,
        status: 'Open'
    };

    issues.push(newIssue);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

