
const { AreaEnums } = require("../constants/enums/AreaEnums")


module.exports.calculatePercentage = async(tests)=>{
        let totalyes = 0
        tests.forEach((test)=>{
            if(AreaEnums.includes(test.question.area))
                if(test.answer == 'YES'){
                    totalyes +=1
                }
        })
        return totalyes/tests.length
}