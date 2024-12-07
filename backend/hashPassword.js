const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Hashed Password:', hashedPassword);
    } catch (err) {
        console.error('Error hashing password:', err);
    }
};

// Replace 'securepassword123' with the password you want to hash
hashPassword('acj2024@');


// $2b$10$0lo0W8SWRcY/rfho4k1/TO9H85eBTVXFMnGRc6i/jCPHx8RLBBEim
// $2b$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC

// $2b$10$XhpcgqT.L3/hDl5/8s7InuOr9OV/XtHCc2v5y/IJJ33I.BjrHhyEC