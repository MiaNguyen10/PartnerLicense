export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])(?!.*(.)\1{2,})[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;
export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const regexFormat = {
    passwordRegExp,
    emailRegExp
  };
  
  export default regexFormat;