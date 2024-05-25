const StudentGroupModel = require("../model/StudentGroupModel")
const Student = require("../model/studentModel")
const StudentPromotionModel = require("../model/StudentPromotion")


module.exports.PromoteStudents = async (username,percentage)=>{
    await StudentGroupModel.findOne({student: username}).then(async(res)=>{
        if(percentage > 0.8 && res.group == "PRIMARY"){
                await StudentGroupModel.findOneAndUpdate({student: username},{group:"OTHER"}).then(async(r)=>{
                    await StudentPromotionModel.create({student: username,date:Date.now(),promoteFromgroup:"PRIMARY",promoteTogroup:"OTHER",report:r._id}).then(()=>{
                        return true
                    })
                })
        }
    })
    
}