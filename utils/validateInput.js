const Joi = require("joi")

const registerSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Regular',"Admin").optional(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const docSchema = Joi.object({
    title: Joi.string().max(255).required(),
    content: Joi.string().min(6).required(),
})

module.exports = {
    validateRegister : (data) => registerSchema.validate(data),
    validateLogin : (data) => loginSchema.validate(data),
    validateDocument : (data) => docSchema.validate(data),
}