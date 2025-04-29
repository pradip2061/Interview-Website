const User = require("../../model/User");
const Query = require("../../model/UserSuggestModel");

const Userquery = async (req, res) => {
  try {
    const { formData } = req.body;
    const userid = req.user;

    // Validate input fields
    if (!formData.question || !formData.answer || !formData.remarks) {
      return res.status(400).json({
        message: 'Please fill in all the fields properly.'
      });
    }

    // Check if user exists
    const userCheck = await User.findOne({ _id: userid });
    if (!userCheck) {
      return res.status(404).json({
        message: 'User not found!'
      });
    }

    console.log('User Found:', userCheck);

    // Create and save the query
    const querysave = new Query({
      question: formData.question,
      answer: formData.answer,
      remarks: formData.remarks,
      username: userCheck.username
    });

    await querysave.save();

    // Respond with success
    res.status(200).json({
      message: 'Query sent successfully!',
    });

  } catch (error) {
    console.error('Error saving query:', error); // Log the error for better debugging
    return res.status(500).json({
      message: 'An error occurred while saving the query. Please try again later.',
    });
  }
};

module.exports = Userquery;
