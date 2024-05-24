const { register, login } = require("../controllers/authControllers");
const multer = require('multer');
const { addTeachers, addStudents } = require("../controllers/addDetailsController");
const { updateStudentDetails, updateTeacherDetails } = require("../controllers/updateDetailsController");
const { studentevaluation } = require("../controllers/studentEvaluation");
const { initializeTermYear } = require("../controllers/initializeTermYear");


const { checkUser } = require("../middlewares/authMiddleware");
const { checkIfAdmin } = require("../middlewares/checkIfAdminMiddleware");
const { checkIfTeacher } = require("../middlewares/checkIfTeacherMiddleware");
const { checkIfStudent } = require("../middlewares/checkifStudentMiddleware");
const { checkIfTeacherorAdminMiddleware } = require("../middlewares/checkIfTeacherorAdminMiddleware");

const { getAssignedStudents } = require("../getters/getAssignedStudents");
const { getStudentBasicDetails } = require("../getters/getStudentBasicDetails");
const { getStudentHistory } = require("../getters/getStudentHistory");
const { getStudentEvaluation } = require("../getters/getStudentEvaluation");





const router = require("express").Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/", checkUser); 
router.post("/test",checkUser,(req,res)=>{
    console.log(req.body)
})
router.post("/register", register);
router.post("/login", login);

router.post("/addteachers",checkIfAdmin,upload.single('file'), addTeachers);
router.post("/addstudents",checkIfTeacherorAdminMiddleware,upload.single('file'), addStudents);


router.post("/updatestudentdetails",checkIfStudent,updateStudentDetails )
router.post("/updateteacherdetails",checkIfTeacher,updateTeacherDetails )

router.post("/studentevaluation",checkIfTeacher,studentevaluation)
    
router.post("/getassignedstudents",checkIfTeacher,getAssignedStudents)

router.post("/getstudentbasicdetails",checkIfTeacher,getStudentBasicDetails)
router.post("/getstudentevaluation",checkIfTeacher,getStudentEvaluation)



router.post("/inittermyear",checkIfAdmin,initializeTermYear)

router.post("/admin",checkIfAdmin,(req,res,next) =>{
    res.json({username:req.username,status:req.status});
})
router.post("/class",checkIfTeacher,(req,res,next) =>{
    res.json({username:req.username,status:req.status});
})

router.post("/getstudenthistory",checkIfTeacher,getStudentHistory)



module.exports = router;
