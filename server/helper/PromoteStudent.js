const StudentGroupModel = require("../model/StudentGroupModel")
const Student = require("../model/studentModel")

module.exports.PromoteStudents = async (username,percentage)=>{
    await StudentGroupModel.findOne({student: username}).then(async(res)=>{
        if(percentage > 80 && res.group == "PRIMARY"){
                await StudentGroupModel.findOneAndUpdate({student: username},{group:"OTHER"}).then((r)=>{
                    return true
                })
        }
    })
    
}