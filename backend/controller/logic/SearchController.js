const search = async(req,res)=>{
    const{search}=req.query
    const language = search.replace(/\s+/g, '').toLowerCase();
    if(language.includes('html')){
        
    }
    
}

module.exports = search