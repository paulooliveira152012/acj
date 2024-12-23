const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // 10 is a common value for the salt rounds
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword; // Return the hashed password
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err; // Rethrow the error for further handling if needed
  }
};

// Example usage
hashPassword("acj2024@");



  





// $2b$10$0lo0W8SWRcY/rfho4k1/TO9H85eBTVXFMnGRc6i/jCPHx8RLBBEim
// $2b$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC

// $2b$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC