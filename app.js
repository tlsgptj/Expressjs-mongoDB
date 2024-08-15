import express from 'express';
import tasks from './data/mock.js';

const app = express();
app.use(express.json());
app.get('/tasks', (req, res) => {
    /**
     * 쿼리 파라미터 
     * - sort : 'oldest인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
     * - count : 태스크 개수
     */
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

    res.send(newTasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
        res.send(task);
    } else {
        res.status(404).send({message: 'Cannot find given id.'});
    }
    
});
/**
 * 새 태스크 하나 생성하기
 */
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    const ids = tasks.map((task) => task.id);
    newTask.id = Math.max(...ids) + 1;
    newTask.isComplete = false;
    newTask.createdAt = new Date();
    newTask.updatedAt = new Date();
    tasks.push(newTask);
    res.status(201).send(newTask);
});

app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (task) {
        Object.keys(req.body).forEach((key) => {
            task[key] = req.body[key];
        });
        task.updatedAt = new Date();
        res.send(task);
    } else {
        res.status(404).send({message: 'Cannot find given id.'});
    }
    
});

app.listen(3000, () => console.log('Server Started'));
