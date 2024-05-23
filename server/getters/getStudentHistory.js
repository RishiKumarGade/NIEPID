const Student = require("../model/studentModel");


const Report = require("../model/ReportModel");




module.exports.getStudentHistory = async(req,res,next)=>{
        try {
            const student = await Student.findOne(req.body.username)
            if(!student){
                res.json({message:"there is no student"})
            }else{
                const hist = await Report.find({student:student.username})
                res.json({data:hist,status:req.status,username:req.username})
            }
        } catch (error) {
            return
        }
}



  