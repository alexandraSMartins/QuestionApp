const express = require('express');
const router = express.Router();
const Question = require('../models/Question/Question');
//Import functions
import { mapToQuestionList } from "./Mapper";

//Submit question
router.post('/', async(req, res) => {
    try 
    {
        const question = new Question({
            name: req.body.name,
            email: req.body.email,
            date: new Date(req.body.date), 
            observations: req.body.observations
        });
    
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    }catch(err) {
        if (err.name === 'ValidationError')
        {
            res.status(400).json(err)
        }
        else{
            res.status(500).json({message: err})
        }
    };
});


//Get questions
router.get('/', async(req, res) => {
    try 
    {
        const id = req.query.id;
        const page = req.query.page;
       
        if (id)
        {
            const result = await Question.findById(id);
            if (!result)
            {
                res.status(404).json({message:`Question with id ${id} not found`});
            } else {

                res.json(mapToQuestionList(result, 1));
            }
        } else {
            if (page)
            {
                const pageNumber = Number(page);
                if (isNaN(pageNumber)){
                    res.status(400).json({message:`Page value ${page} is not a valid number`});
                }        
                
                const skip = pageNumber * 20;
                const result = await Question.find().sort({creationDate: -1}).skip(skip).limit(20);
                const total = await Question.countDocuments({});

                res.json(mapToQuestionList(result, total));
            } else {
                const result = await Question.find().sort({creationDate: -1}).limit(20);
                const total = await Question.countDocuments({});
                res.json(mapToQuestionList(result, total));
            }
        }       
    }catch(err) {
        console.log(err);
            res.status(500).json({message: err});
    };
});

module.exports = router;