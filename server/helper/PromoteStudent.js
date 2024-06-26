const StudentGroupModel = require("../model/StudentGroupModel")
const StudentPromotionModel = require("../model/StudentPromotion")


const PASS_PERCENTAGE = 0.8



module.exports.PromoteStudents = async (username,percentage,id)=>{
    await StudentGroupModel.findOne({student: username}).then(async(res)=>{
        if(percentage > PASS_PERCENTAGE && res.group == "PRIMARY"){
                return promoteTo("PRIMARY","OTHER",id,username)
                // TODO write other conditions , just copy paste if statement and call promoteTo function
        }else{
            return null
        }
    })
    
}


async function promoteTo(from ,to,id,username){
    await StudentGroupModel.findOneAndUpdate({student: username},{group:"OTHER"}).then(async(r)=>{
        await StudentPromotionModel.create({student: username,date:Date.now(),promoteFromgroup:from,promoteTogroup:to,report:id}).then((m)=>{
            return m
        })
    })
}