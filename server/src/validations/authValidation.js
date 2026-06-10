const Joi = require('joi');

const loginSchema = Joi.object({
    lreg: Joi.string().required(),
    lpassword: Joi.string().required()
});

const updatePasswordSchema = Joi.object({
    reg: Joi.string().required(),
    pass: Joi.string().required(),
    password: Joi.string().required().min(6)
});

const registerTeacherSchema = Joi.object({
    name: Joi.string().required(),
    tid: Joi.string().required(),
    password: Joi.string().required().min(6),
    dept: Joi.string().required()
});

module.exports = {
    loginSchema,
    updatePasswordSchema,
    registerTeacherSchema
};
