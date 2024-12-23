// const bcrypt = require('bcryptjs'); // Temporarily commenting out bcrypt

const hashPassword = async (password) => {
    try {
      // Temporarily mock the hashed password (skip bcrypt for now)
      const hashedPassword = password;  // Just return the plain password temporarily
      console.log("Hashed Password:", hashedPassword);
      return hashedPassword; // Return the "hash" (which is just the plain password for now)
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