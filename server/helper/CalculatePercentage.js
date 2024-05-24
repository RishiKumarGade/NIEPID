
const { AreaEnums } = require("../constants/enums/AreaEnums")
const ReportModel = require("../model/ReportModel")


module.exports.calculatePercentage = async(id)=>{
        const qas = await ReportModel.findOne({_id: id}).populate("tests.question").select("tests")
        let totalyes = 0
        for(qa in qas){
            if( AreaEnums.includes(qa.question.area))
                if(qas.answer == 'YES'){
                    totalyes +=1
                }
        }
        return totalyes/qas.length
}