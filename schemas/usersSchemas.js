import Joi from "joi";

export const signUpJoiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { deny: ["ru", "su"] },
    })
    .message("We don't need users from mordor")
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d).*$/)
    .message(
      "Password must be at least 8 characters long, contain at least one uppercase letter, and at least one digit"
    )
    .required(),
});
