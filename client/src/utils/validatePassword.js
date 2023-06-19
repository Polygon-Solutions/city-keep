/** 
 * *
 * Validate Password Function
 * @description 
    - Checks if input satisfies password rules set by 
      Cognito using regular expression
 * TODO: Fix regex to be consistent with Cognito
 * @listens SignIn
 * @listens SignUp
 * @param {string} password
 * @returns {boolean}
 */
const validatePassword = (password) => {
  return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};

export default validatePassword;
