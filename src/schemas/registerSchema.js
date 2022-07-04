import joi from 'joi';

const registerSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().min(8),
  confirmPassword: joi.ref('password')
});

export default registerSchema;