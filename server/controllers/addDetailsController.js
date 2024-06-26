const xlsx = require('xlsx');
const multer = require('multer');
const Student = require("../model/studentModel")
const User = require("../model/userModel")
const Teacher = require("../model/teacherModel");
const ReportModel = require("../model/ReportModel");
const StudentGroupModel = require('../model/StudentGroupModel');
const { testQuestions } = require('../helper/testQuestions');
const {HandleValidityofStudent,HandleValidityofTeacher} = require("../helper/HandleValidity")

module.exports.addTeachers = async (req, res, next) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    let check = []
    data.map(async(row)=>{
       await User.findOne({username: row.username}).then((c)=>{
        if(c)
        check.push(c.username);
       })
    })
    if(check.length != 0){
        res.json({success:false,data:check,message:"these usernames already exist please change or remove them"})
    }else{
      data.map(async(row)=>{
        let teacher = {}
        Object.keys(row).forEach((key)=>{
          const validkey = HandleValidityofTeacher(key,row[key]);
          if(!validkey){
            res.json({success:false,data:check,message:"Please again check the rows,there are some invalid keys,values"})
            return
          }else{
            teacher[key] = row[key];
          }
        })
        await Teacher.create(teacher).then(s=>{
        })
      })
      res.json({username:req.username,status:req.status});
    }
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ success: false, error: 'Error reading file' });
  }
}

module.exports.addStudents = async (req, res, next) => {
    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        const stus = data.map(row=>row.username)
        const check = await User.find({username:{$in:stus}})
        if(check.length != 0){
            res.json({success:false,data:check,message:"these usernames already exist please change or remove them"})
        }else{
          data.map(async(row)=>{
            let student = {}
        Object.keys(row).forEach((key)=>{
          if(key !== "Group"){
            const validkey = HandleValidityofStudent(key,row[key]);
          if(!validkey){
            res.json({success:false,data:check,message:"Please again check the rows,there are some invalid keys,values"})
            return
          }else{
            student[key] = row[key];
          }
          }
        })
           await testQuestions({area:row.Group}).then(async(tests)=>{
              await Student.create(student).then(async(s)=>{
                await StudentGroupModel.create({student:student.username,group:row.Group}).then(async(s)=>{
                  await ReportModel.create({
                    student:student.username,
                    termYear: 10,
                    group:row.Group,
                    tests:tests
                }).then((r)=>{
                  res.json({username:req.username,status:req.status});
                })
                })
              })
            })
          })
        }
      } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ success: false, error: 'Error reading file' });
      }
}