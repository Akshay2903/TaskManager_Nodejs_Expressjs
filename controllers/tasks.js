const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper (async (req,res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
        // res.status(200).json({ tasks, amount: tasks.length })
        // res
        //     .status(200)
        //     .json({ status: 'success', data: { tasks, nbHits: tasks.length }})
})

const createTask = asyncWrapper(async (req, res) => {
        const {name, completed} = req.body
        const task = await Task.create({ name, completed})
        res.status(201).json({ task })
    
})

const getTask = asyncWrapper(async (req, res, next) => {
        const { id:taskID } = req.params
        const task = await Task.findOne({_id:taskID})
        
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res) => {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({ _id: taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body,{
            new: true,
            runValidators: true
        })

        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}