import Joi from 'joi';

export const signUpJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: ['ru', 'su'] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d).*$/)
    .message(
      'Password must be at least 8 characters long, contain at least one uppercase letter, and at least one digit',
    )
    .required(),
});

export const checkEmailJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: ['ru', 'su'] },
    })
    .required(),
});

export const signInJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(8).required(),
});

export const editUserJoiSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { deny: ['ru', 'su'] },
  }),
  name: Joi.string()
    .min(2)
    .max(40)
    .regex(/^[A-Za-z\s]+$/),
  gender: Joi.string().valid('Man', 'Woman'),
  weight: Joi.number().min(20).max(600).integer().messages({
    'number.min': 'You cannot weigh less than 20 kilograms',
    'number.max': 'You cannot weigh more than 600 kilograms',
    'number.integer': 'Weigth value must be integer',
  }),
  activityTime: Joi.number().integer().min(0).max(12).messages({
    'number.integer': 'Activity time value must be integer',
    'number.positive': 'Activity time value must be positive',
  }),
  desiredVolume: Joi.number().min(100).max(31200).integer().messages({
    'number.min': 'Please enter below 100 and 31200 ml',
    'number.max': 'Please enter below 100 and 31200 ml',
    'number.integer': 'Vater volume value must be integer',
  }),
}).or('email', 'name', 'gender', 'weight', 'activityTime', 'desiredVolume');

export const refreshJoiSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
