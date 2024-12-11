// validators.js
export const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
