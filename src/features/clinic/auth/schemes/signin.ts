import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
   email: Joi.string().email().required().messages({
      'string.base': 'Field must be a string',
      'string.required': 'Email is a required field',
      'string.email': 'Email must be valid',
   }),
   password: Joi.string().required().min(4).max(40).messages({
      'string.base': 'Password must be of type string',
      'string.min': 'Invalid password',
      'string.max': 'Invalid password',
      'string.empty': 'Password is a required field',
   }),
});

export { loginSchema };
