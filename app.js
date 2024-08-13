import express from 'express';
import tasks from './data/mock.js';

const app = express();

app.get('/tasks', (req, res) => {
    const sort = Number(req.query.sort);
    const count = Number(req.query.count);
    const compareFn = 
        sort == 'oldest'
        ? (a, b) => a.createdAt - b.createdAt
        : (a, b) => b.createdAt - a.createdAt

    let newTasks = tasks.sort(compareFn);
    
    if (count) {
        newTasks = newTasks.slice(0, count);
    }

    res.send(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
