import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
export interface IUser {
    username: string,
    email: string,
    password: string,
    role: 'admin' | 'user',
    firstName?: string,
    lastName?: string,
    socialLinks?: {
        website?: string,
        twitter?: string,
        instagram?: string,
        youtube?:string

    }

}


const userSchema  = new Schema<IUser>({
    username:{
        type:String,
        required:[true, "Username is required"],
        maxLength:[20, "Username must be 20 characters or less."],
        unique:[true, "Username must be unique."]

    },
    email:{
        type:String,
        required:[true , "Email is required"],
        maxLength:[50,"Email must be 50 charatcters or less."],
        unique:[true, "Email must be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required."],
        minLength:[8 , "Password can only be a minimum of 8 characters"],
        maxLength:[15,"Password can have a maximus of 15 characters."],
        select:false
    },
    role:{
        type:String,
        required:[true,"Role is required"],
        enum:{
            values:['admin', 'user'],
            message:'{VALUE} is not supported'
        },
        default:'user'

    },
    firstName:{
        type:String,
        maxLength:[20, "First name can only be 20 characters or less."],
        minLength:[3,"First name cannot be less than 3 characters."]
    },
    lastName:{
        type:String,
        maxLength:[20, "First name can only be 20 characters or less."],
        minLength:[3,"First name cannot be less than 3 characters."]
    },
    socialLinks:{
        website:{
            type:String,
            maxLength:[100,"Website link be 100 characters or less."]
        },
        twitter:{
            type:String,
            maxLength:[100,"Twitter link must be 100 characters or less."]
        },
        instagram:{
            type:String,
            maxLength:[100,"Instagram link must be 100 characters or less."]
        },
        youtube:{
            type:String,
            maxLength:[100,"Youtube link must be 100 characters or less."]
        },
    },
    
},
{
    timestamps:true
}

)
userSchema.pre('save', async function (next){
    if (!this.isModified('password')){
        next();
        return
    }
    //hash password
    this.password = await bcrypt.hash(this.password,10)
    next();
})

export default model <IUser>('User', userSchema)