const HtmlTheory = require("../../model/HtmlModel")
const javaTheory = require("../../model/JavaModel")
const PythonTheory = require("../../model/PythonModel")

const getModelByLanguage = (language) => {
    switch (language) {
      case 'html':
        return HtmlTheory;
      case 'java':
        return javaTheory;
      case 'python':
        return PythonTheory;
      default:
        return null;
    }
  };
  
  const createHtmlQuestionOutput = async (req, res) => {
    const { formData } = req.body;
    const { Topic, question, theory, category, outputQuestion = "", language } = formData;
  
    if (!Topic || !question || !theory || !category || !language) {
      return res.status(400).json({ message: 'All fields are required except outputQuestion!' });
    }
  
    const Model = getModelByLanguage(language);
    if (!Model) return res.status(400).json({ message: 'Invalid language provided!' });
  
    try {
      let data = await Model.findOne({ Topic });
  
      const newEntry = {
        question,
        outputQuestion, // optional
        Answer: { theory },
        category,
      };
  
      if (!data) {
        const newDoc = new Model({ Topic, data: [newEntry] });
        await newDoc.save();
      } else {
        data.data.push(newEntry);
        await data.save();
      }
  
      res.status(200).json({ message: 'Create successful' });
    } catch (error) {
      console.error("Error saving output question:", error);
      res.status(500).json({ message: 'Server error!' });
    }
  };
  
  const createHtmlQuestionTheory = async (req, res) => {
    const { formData } = req.body;
    const { Topic, question, theory, category, code = "", language } = formData;
  
    if (!Topic || !question || !theory || !category || !language) {
      return res.status(400).json({ message: 'All fields are required except code!' });
    }
  
    const Model = getModelByLanguage(language);
    if (!Model) return res.status(400).json({ message: 'Invalid language provided!' });
  
    try {
      let data = await Model.findOne({ Topic });
  
      const newEntry = {
        question,
        Answer: { theory, code }, // code is optional
        category,
      };
  
      if (!data) {
        const newDoc = new Model({ Topic, data: [newEntry] });
        await newDoc.save();
      } else {
        data.data.push(newEntry);
        await data.save();
      }
  
      res.status(200).json({ message: 'Create successful' });
    } catch (error) {
      console.error("Error saving theory question:", error);
      res.status(500).json({ message: 'Server error!' });
    }
  };
  



  const gethtmlquestion = async (req, res) => {
    try {
        const { topics } = req.params;
        const page = parseInt(req.query.page) || 1;
        const perpage = 10;

        // Find the document for the specific topic
        const topicDoc = await HtmlTheory.findOne({ Topic: topics }); // Make sure key is `Topic`, not `topics`

        if (!topicDoc) {
            return res.status(404).json({ message: "Topic not found" });
        }

        const totalQuestions = topicDoc.data.length; // `.length` is a property, not a function
        const totalpages = Math.ceil(totalQuestions / perpage);

        if (page > totalpages) {
            return res.status(404).json({ message: 'Page not found' });
        }

        const startIndex = (page - 1) * perpage;
        const endIndex = page * perpage;

        const questions = topicDoc.data.slice(startIndex, endIndex);

        res.status(200).json({
            topic: topicDoc.Topic,
            questions,
            totalpages,
            page
        });
    } catch (error) {
        console.error("Error fetching HTML questions:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createHtmlQuestionOutput,gethtmlquestion,createHtmlQuestionTheory}