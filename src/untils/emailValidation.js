const emailValidation = (email) => {
  if (email.includes('@') && email.includes('mail') && email.includes('.com')) {
    return true; 
  }
  return false;
};

module.exports = emailValidation;