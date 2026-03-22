import mongoose , {Schema} from 'mongoose'

const candidateschema = new Schema(
    {
        candidatename: {
            type: String,
            required: true
        },

        age: {
           type: Number,
           required: true,
           min: 25,
           max: 70
        },
        
        constituency: {
            type: String,
            required: true
        },

        party: {
            type: String,
            required: true
        },

        votes: {
            type: Number,
            required: true,
            select : false
        }
        
    },
    
    {
        timestamps: true
    }
)

export const Candidate = mongoose.model('Candidate', candidateschema)