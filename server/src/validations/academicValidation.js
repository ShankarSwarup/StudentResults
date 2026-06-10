const Joi = require('joi');

const addSubjectSchema = Joi.object({
    subj: Joi.string().required(),
    cod: Joi.string().required()
});

const manageSubjectSchema = Joi.object({
    subject: Joi.string().required(),
    semister: Joi.string().required(),
    depart: Joi.string().required(),
    action: Joi.string().valid('add', 'remove').required()
});

const findSubjectsSchema = Joi.object({
    semister: Joi.string().required(),
    depart: Joi.string().required()
});

module.exports = {
    addSubjectSchema,
    manageSubjectSchema,
    findSubjectsSchema
};
