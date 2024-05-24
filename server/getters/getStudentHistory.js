const Student = require("../model/studentModel");
const Report = require("../model/ReportModel");
const StudentPromotion = require("../model/StudentPromotion");





module.exports.getStudentHistory = async(req,res,next)=>{
        try {
            const student = await Student.findOne(req.body.username)
            if(!student){
                res.json({message:"there is no student"})
            }else{
                const hist = await StudentPromotion.find({student:student.username}).populate('report')
                res.json({data:hist,status:req.status,username:req.username})
            }
        } catch (error) {
            return
        }
}



  