import mongoose , {Schema} from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
const userschema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        aadharnumber: {
            type: Number,
            required: true,
            unique: true, 
            min: 12,
            max: 12
        },

        password: {
           type: String,
           required: true,
           unique: true,
           minLength: 6,
           maxLength: 50
        },
        confirmpassword: {
            type: String,
            validate: {
                validator: function (v) {
                    return v == this.password // true or false 
                },
                // custom error message 
                message : 'Confirm password and new password are not same'
            },
            required: true
        },
        passwordchangedtime: {type: Date},
        resettoken:{ type: String},
        tokenexpirytiming: {type: Date},
        role: {
            type: String,
            enum: ['admin', 'voter'],
            required: true
        }
    },
    
    {
        timestamps: true
    }
)

// both for updation and creation document in controller is controlled by middleware 'save'
userschema.pre("save", async function (){
 if(!this.isModified('password')) return; // did we do any changes in the values in that field

 // hash the new password
 this.password = await bcrypt.hash(this.password, 10)//encrypt
})

// instance method for password checking
//during login
userschema.methods.passwordcheck =  async function(password) {
    return await bcrypt.compare(password, this.password)
}

// instance method for password reset token 
userschema.methods.passwordresettoken = async function() {
   // generate token
    const token = crypto.randomBytes(32).toString('hex')
   // hash the token to encrypt the token and store in database
   this.resettoken = crypto.createHash('sha256').update(token).digest('hex')
   // expiry timing of token 
   this.tokenexpirytiming = Date.now() + 10*60*1000 // beyond this date the contents within the method will expire 

   return token;
}

export const User = mongoose.model('User', userschema)