import {Candidate} from '../models/candidatemodel.js'


// read all electors details
const readelectors = async(req,res) => {
try{
const electors = await Candidate.find(); // exclude the no of votes field

res.status(200).json({message: 'Details of electors', electors})
}catch(err){
    res.status(500).json({message: 'internal server error'})
}
}

// post vote -> vote count increase
const castvote = async(req,res) => {
    try {
       const vote = await Candidate.findByIdAndUpdate(req.params.id, {$inc: {votes: 1}}, {new: true}).select('+votes') // to increment the vote count
        // on the specific id// fetch the id from the route 

        if(!vote) return res.status(400).json({message: 'candidate not found'})

        res.status(200).json({message: 'Vote casted', vote})

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}

const readvotecount = async(req,res) => {
    try {
        const votecount = await Candidate.find({}).sort({votes: -1}).select('+votes').exec();

        if(!votecount) return res.status(400).json({message: 'not found'})

        res.status(200).json({votecount})
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
}
// read vote count 

export {
    readelectors, castvote, readvotecount
}