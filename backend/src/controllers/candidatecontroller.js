import {Candidate} from '../models/candidatemodel.js'

// create electors

const createelector = async(req,res) =>{
    const {candidatename, age, constituency, party} = req.body
try{
    if(!candidatename || !age || !constituency || !party) return res.status(400).json({
        message : 'enter complete details'})

    const elector = await Candidate.findOne({constituency , party})

    if(elector) return res.status(400).json({
        message: `Candidate from ${party} in ${constituency} already available`})

    const createdelector = await Candidate.create({
        candidatename,
        age,
        constituency,
        party
    })
    res.status.json(201).json({
    message: `${candidatename} from ${party} is registered for ${constituency}`, createdelector})
}
catch(error){
    res.status(500).json({message: 'Internal server errror'})
}
}

// update elector info
const updateelector = async(req,res) => {
 try {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({message : "No data given for update"})
    } // to check whether any data is present to update

    const electordata = await Candidate.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(!electordata) return res.status(400).json({message: 'no update made'})

    res.status(200).json({message: 'update done', electordata})
 } catch (error) {
    res.status(500).json({message: 'Internal Server error'})
 }
}
// delete elector
const deleteelector = async(req,res) => {
    try{
    const deletedata = await Candidate.findByIdAndDelete(req.params.id)

    if(!deletedata) return res.status(400).json({message: 'no data found to delete'})

    res.status.json({message : 'Data deleted'})
}catch(error){
    res.status(500).json({message: 'Internal Server error'})
}
}

export {
    createelector, updateelector, deleteelector
}