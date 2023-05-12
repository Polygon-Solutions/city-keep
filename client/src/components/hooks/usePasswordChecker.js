/** 
 * *
 * Password Checker
 * @description 
    - Checks if input satisfies password rules set by 
      Cognito using regular expression
 * TODO: Fix regex to be consistent with Cognito
 * @listens SignIn,SignUp (12-05-2023)
 * @param {string} password
 * @returns {boolean}
 */
export default function usePasswordChecker(password) {
  return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
}
