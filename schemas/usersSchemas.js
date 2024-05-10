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
    .regex(/^[A-Za-z\s]+$/),
  gender: Joi.string().valid('Man', 'Woman'),
  weight: Joi.number()
    .min(20, 'You cannot weigh less than 20 kilograms')
    .max(600, 'You cannot weigh more than 600 kilograms'),
  activityTime: Joi.number(),
  desiredVolume: Joi.number(),
});

export const refreshJoiSchema = Joi.object({
  refreshToken: Joi.string().required(),
});