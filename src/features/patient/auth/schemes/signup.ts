import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  dni: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Dni must be of type string',
    'string.min': 'Invalid dni',
    'string.max': 'Invalid dni',
    'string.empty': 'Dni is a required field'
  }),
  names: Joi.string().required().messages({
   'string.base': 'Names must be of type string',
   'string.empty': 'Names is a required field'
 }),



});

export { signupSchema };
