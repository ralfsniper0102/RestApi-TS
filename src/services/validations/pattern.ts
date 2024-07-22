export const pattern = {
  allowedEmailChars: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
  disallowedChars : /[():{}|<>]/,
  allowedPhoneChars: /^[0-9]{10}$/,
  allowedMobilePhoneChars: /^[0-9]{11}$/,
  allowedNameChars: /^[a-zA-Z\s]{3,}$/,
  allowedZipChars: /^[0-9]{8}$/,
};