import joi from 'joi';

const transitionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required()
});

export default transitionSchema;