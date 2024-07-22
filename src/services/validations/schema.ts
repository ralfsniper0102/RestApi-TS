import joi from "joi";
import { pattern } from "./pattern";

const user = joi.object({
  email: joi
    .string()
    .pattern(pattern.allowedEmailChars)
    .message("Invalid email")
    .required(),

  password: joi
    .string()
    .min(6)
    .custom((value, helpers) => {
      if (pattern.disallowedChars.test(value)) {
        return helpers.error("string.invalidCharacters");
      }
      return value;
    })
    .message("Invalid password")
    .required(),
});

const client = joi.object({
  name: joi
    .string()
    .required()
    .pattern(pattern.allowedNameChars)
    .message("Invalid name"),

  email: joi
    .string()
    .pattern(pattern.allowedEmailChars)
    .message("Invalid email")
    .required(),

  mobilePhone: joi
    .string()
    .pattern(pattern.allowedMobilePhoneChars)
    .message("Invalid mobile phone")
    .required(),

  phone: joi
    .string()
    .pattern(pattern.allowedPhoneChars)
    .message("Invalid phone"),

  address: joi
    .string()
    .custom((value, helpers) => {
      if (pattern.disallowedChars.test(value)) {
        return helpers.error("string.invalidCharacters");
      }
      return value;
    })
    .message("Invalid adress")
    .required(),

  city: joi
    .string()
    .custom((value, helpers) => {
      if (pattern.disallowedChars.test(value)) {
        return helpers.error("string.invalidCharacters");
      }
      return value;
    })
    .message("Invalid city")
    .required(),

  state: joi
    .string()
    .custom((value, helpers) => {
      if (pattern.disallowedChars.test(value)) {
        return helpers.error("string.invalidCharacters");
      }
      return value;
    })
    .message("Invalid state")
    .required(),

  zip: joi
    .string()
    .pattern(pattern.allowedZipChars)
    .message("Invalid zipcode")
    .required(),

  country: joi
    .string()
    .custom((value, helpers) => {
      if (pattern.disallowedChars.test(value)) {
        return helpers.error("string.invalidCharacters");
      }
      return value;
    })
    .message("Invalid country")
    .required(),

  createdById: joi.number().required(),
});

export = { user, client };
