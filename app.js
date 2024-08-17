import express from 'express';
import tasks from './data/mock.js';
import mongoose from 'mongoose';
import { DATABASE_URL } from './env.js';
import Task from './models/tasks.js';

const app = express();
app.use(express.json());
app.get('/tasks', async (req, res) => {
    /**
     * 쿼리 파라미터 
     * - sort : 'oldest인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
     * - count : 태스크 개수
     */
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const sortOption = { createdAt: sort === 'oldest' ? 'asc' : 'desc' }; //객체 생성
    const tasks = await Task.find().sort(sortOption).limit(count);
    //쿼리를 리턴하기 때문에 메소드를 연결해서 사용 가능함 -> 최종결과 쿼리

    res.send(tasks);
});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id); //쿼리를 리턴, await을 이용해 결과를 리턴 
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

mongoose.connect(DATABASE_URL).then(() => console.log('Connected to DB'));
app.listen(3000, () => console.log('Server Started'));
