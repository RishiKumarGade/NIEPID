const Report = require("../model/ReportModel")
const Student = require("../model/studentModel")
const StudentGroup = require("../model/StudentGroupModel")
const areaQuestion = require("../model/QuestionModel")
const { testQuestions } = require("../helper/testQuestions")



module.exports.initializeTermYear = async (req, res, next) => {
    const { term,year,group } = req.body
    const termYear = (parseInt(year)*10)+parseInt(term)
    const check = await Report.find({termYear: parseInt(termYear) , group: group})
    if(check.length>0){
        res.json({message:"Already Initialized",success:false})
        return
    }else{
        
        await testQuestions().then(async(tests)=>{
            await StudentGroup.find({group: group}).then(async(studentGrps)=>{
                studentGrps.map(async(studentgrp)=>{
                    await Report.create({
                        student:studentgrp.student,
                        termYear: termYear,
                        group:group,
                        tests:tests
                    })
                })
            })
        
            res.json({status:req.status,success:true ,message:"Initialized"})
        })
        
    }
    
}
