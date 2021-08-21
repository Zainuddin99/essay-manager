//Custom try catch handlers
const asyncWrapper = require('../Errorhandlers/asyncWrapper');

//Custom error creator function
const { createCustomErrorInstance } = require('../Errorhandlers/customErrorHandle');

//Essay Model
const Essays = require('../Database/Models/Essay');


const getAllEssays = asyncWrapper(async(req, res) =>{
    const documents = await Essays.find({})
    res.status(200).json({message: 'Successfull', result_length: documents.length, result: documents})
})

const addEssay = asyncWrapper(async(req, res, next) =>{

    const {title, author, body} = req.body

    if(!title || !author || !body){
        return next(createCustomErrorInstance('All fields are needed', 400))
    }

    const document = await Essays.create(req.body)
    res.status(201).json({result: document})
})

const deleteEssay = asyncWrapper(async(req, res, next)=>{
    const {id} = req.params

    const deletedDocument = await Essays.findOneAndDelete({_id: id})
    if(!deletedDocument){
        return next(createCustomErrorInstance('No Essay found to be deleted', 400))
    }

    res.status(200).json({message: 'Essay deleted successfully'})
})

const getEssay = asyncWrapper(async(req, res, next)=>{
    const document = await Essays.findOne({_id: req.params.id})

    if(!document){
        return next(createCustomErrorInstance('No Essay found', 404))
    }

    res.status(200).json({message: 'Successfull', result: document})
})

const updateEssay = asyncWrapper(async(req, res, next)=>{
    const document = await Essays.findOneAndUpdate({_id: req.params.id}, req.body)

    if(!document){
        return next(createCustomErrorInstance('No Essay found', 404))
    }

    res.status(200).json({message: 'Essay updated successfully'})
})

module.exports = {getAllEssays, addEssay, deleteEssay, updateEssay, getEssay}