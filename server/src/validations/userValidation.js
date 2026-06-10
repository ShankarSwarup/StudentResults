const Joi = require('joi');

const addStudentSchema = Joi.object({
    depart: Joi.string().required(),
    name: Joi.string().required().min(3),
    reg: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().email().required(),
    phn: Joi.string().required().length(10),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    address: Joi.string().required(),
    year: Joi.string().required()
});

const addTeacherSchema = Joi.object({
    name: Joi.string().required(),
    reg: Joi.string().required(),
    pass: Joi.string().required().min(6),
    dept: Joi.string().required()
});

module.exports = {
    addStudentSchema,
    addTeacherSchema
};
