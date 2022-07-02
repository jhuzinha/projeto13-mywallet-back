import joi from 'joi';

const transitionSchema = joi.object({
  value: joi.string().required(),
  description: joi.string().required()
});

export default transitionSchema;