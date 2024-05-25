
const { AreaEnums } = require("../constants/enums/AreaEnums")
const ReportModel = require("../model/ReportModel")


module.exports.calculatePercentage = async(tests)=>{
        let totalyes = 0
        tests.forEach((test)=>{
            if( AreaEnums.includes(test.question.area))
                console.log(true)
                if(test.answer == 'YES'){
                    totalyes +=1
                }
        })
        return totalyes/tests.length
}