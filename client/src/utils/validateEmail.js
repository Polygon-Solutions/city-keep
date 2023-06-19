/** 
 * *
 * Validate Email Function
 * @description 
    - Checks if input is a valid email address using 
      regular expression
 * @listens SignIn
 * @listens SignUp
 * @param {string} email
 * @returns {boolean}
 */
const validateEmail = (email) => {
  return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

export default validateEmail;
