const HtmlTheory = require("../../model/HtmlModel")

const createHtmlQuestionOutput = async (req, res) => {
  const{Topic,question,theory,category,outputQuestion}=req.body
  if(!Topic|| !question|| !theory || !category){
    return res.status(400).json({
        message:'All field are required!'
    })
  }
  const data = await HtmlTheory.findOne({Topic:Topic})
  console.log(data)
  if(!data){
    const queries = new HtmlTheory({
        Topic:Topic,
        data:[
            {
                question:question,
                outputQuestion,
                Answer:{
                    theory:theory,
                },
                category:category
            }
        ]
    })
    await queries.save()
  }else{
    data.data.push({
        outputQuestion,
        Answer:{
            theory,
        },
        question,
        category
    })
    await data.save()
  }

res.status(200).json({
    message:'create successful'
})
}


const createHtmlQuestionTheory = async (req, res) => {
    const{Topic,question,theory,category,code}=req.body
    if(!Topic|| !question|| !theory || !category){
      return res.status(400).json({
          message:'All field are required!'
      })
    }
    const data = await HtmlTheory.findOne({Topic:Topic})
    console.log(data)
    if(!data){
      const queries = new HtmlTheory({
          Topic:Topic,
          data:[
              {
                  question:question,
                  Answer:{
                      theory:theory,
                      code:code
                  },
                  category:category
              }
          ]
      })
      await queries.save()
    }else{
      data.data.push({
          Answer:{
              theory,
              code
          },
          question,
          category
      })
      await data.save()
    }
  
  res.status(200).json({
      message:'create successful'
  })
  }



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