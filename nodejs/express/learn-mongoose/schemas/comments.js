const mongoose=require("mongoose")

const {Schema}=mongoose;
//ObjectID라는 타입은 javascript의 기본타입이 아니여서
//mongoose객체가있는 schema객체로부터 받아옴??ㄷ
const {Types:{ObjectId}}=Schema;
const commnetSchema=new Schema({
    commenter:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model("Comment",commnetSchema);