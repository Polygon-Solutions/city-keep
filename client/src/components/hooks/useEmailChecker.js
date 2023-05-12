/** 
 * *
 * Email Checker
 * @description 
    - Checks if input is a valid email address using 
      regular expression
 * @listens SignIn,SignUp (12-05-2023)
 * @param {string} email
 * @returns {boolean}
 */
export default function useEmailChecker(email) {
  return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}
