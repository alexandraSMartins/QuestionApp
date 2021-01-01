/*  
This file contains the mappings to the questions objects
*/

export function mapToQuestionList(questionList, total) { 
    let result = {
        count: total,
        questions: []
    };

    if (Array.isArray(questionList))
    {
        result.questions = questionList.map(question => { 
            return mapToQuestion(question);
        });
    } else {
        result.questions.push(mapToQuestion(questionList));
        result.count = 1;
    }

    return result;
};

export function mapToQuestion(question) {
    return {
        id: question._id,
        name: question.name,
        email: question.email,
        date: question.date,
        observations: question.observations,
        creationDate: question.creationDate
    };
};