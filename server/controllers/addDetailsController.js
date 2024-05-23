const xlsx = require('xlsx');
const multer = require('multer');
const Student = require("../model/studentModel")
const User = require("../model/userModel")
const Teacher = require("../model/teacherModel");
const StudentGroupModel = require('../model/StudentGroupModel');



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
          teacher[key] = row[key];
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
            let student = {}
        Object.keys(row).forEach((key)=>{
          if(key !== "Group")
          student[key] = row[key];
        })
            await Student.create(student).then(async(s)=>{
              await StudentGroupModel.create({student:student.username,group:row.Group})
            })

          })
          res.json({username:req.username,status:req.status});

        }
      } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ success: false, error: 'Error reading file' });
      }
}