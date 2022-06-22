export const validateName = (value = "") => {
  return value.length >= 2
    ? false
    : !value.length
    ? "Required"
    : "Name is too short";
};

export const validateEmail = (value = "") => {
  return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ? false
    : "Email is invalid";
};

export const validatePassword = (value = "") => {
  return value.match(
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
  )
    ? false
    : !value.length
    ? "Required"
    : "Password is too simple";
};

export const validatePasswordConfirm = (value = "", password) => {
  return value === password
    ? false
    : !value.length
    ? "Required"
    : "Passwords dont match";
};
