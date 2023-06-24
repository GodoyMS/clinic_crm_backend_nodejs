import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
   dni: Joi.string().required().messages({
      'string.base': 'Field must be a string',
    }),
  password: Joi.string().required().min(4).max(40).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password should have more than 4 characters',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  })
});

export { loginSchema };
