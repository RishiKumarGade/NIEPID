const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const presentConditionSchema = new Schema({
  description: { type: String, required: false }
});

const medicalHistorySchema = new Schema({
  chromosomalAberrations: { type: String, required: false },
  rhIncompatibility: { type: String, required: false },
  geneticAberrations: { type: String, required: false },
  consanguinity: { type: String, required: false },
  threatenedAbortion: { type: String, required: false },
  harmfulMedication: { type: String, required: false },
  antenatalCheckUps: { type: String, required: false },
  significantAccidents: { type: String, required: false },
  infections: { type: String, required: false },
  pregnancy: { type: String, required: false },
  attemptedAbortion: { type: String, required: false },
  nutrition: { type: String, required: false },
  psychologicalTrauma: { type: String, required: false },
  amnioticFluid: { type: String, required: false },
  irradiation: { type: String, required: false },
  nicotine: { type: String, required: false },
  alcohol: { type: String, required: false },
  ageAtConception: { type: String, required: false },
  hypertension: { type: String, required: false },
  diabetes: { type: String, required: false },
  jaundice: { type: String, required: false },
  fetalMovements: { type: String, required: false },
  bleedingLatePregnancy: { type: String, required: false },
  labourDuration: { type: String, required: false },
  prolapsedCord: { type: String, required: false },
  cordAroundNeck: { type: String, required: false },
  multiplePregnancies: { type: String, required: false },
  feedingProblems: { type: String, required: false },
  convulsions: { type: String, required: false },
  colorOfTheBaby: { type: String, required: false },
  significantInjury: { type: String, required: false },
  deliveryPlace: { type: String, required: false },
  term: { type: String, required: false },
  deliveryType: { type: String, required: false },
  abnormalPresentation: { type: String, required: false },
  respiratoryDistress: { type: String, required: false },
  deliveryConductedBy: { type: String, required: false },
  labourInduction: { type: String, required: false },
  birthCry: { type: String, required: false },
  seperationFromMother: { type: String, required: false },
  thyroidDysfunctions: { type: String, required: false },
  nutritionalDisorders: { type: String, required: false },
  significantHeadInjury: { type: String, required: false },
});

const familyHistorySchema = new Schema({
  typeOfFamily: { type: String, required: false },
  mentalRetardation: { type: String, required: false },
  genogran: { type: String, required: false },
  consanguinity: { type: String, required: false },
  seizuresOrConvulsions: { type: String, required: false },
  hearingProblems: { type: String, required: false },
  speechProblems: { type: String, required: false },
  mentalIllness: { type: String, required: false },
  autismOrSpectrumDisorder: { type: String, required: false },
  visualProblems: { type: String, required: false },
  locomotorProblem: { type: String, required: false },
  anyFamilyHistory: { type: String, required: false },
  learningDisabilities: { type: String, required: false },
});

const socialHistorySchema = new Schema({
  familyInvolvement: { type: String, required: false },
  positiveIssues: { type: String, required: false },
  neighbourhoodParticipation: { type: String, required: false },
  personalNeedsOfTheClient: { type: String, required: false },
  visitsToTheFamilyByOthers: { type: String, required: false },
  familyVisitOutside: { type: String, required: false },
  playAndLeisureTimeActivities: { type: String, required: false },
  educationalActivities: { type: String, required: false },
  supportOfExtendedFamily: { type: String, required: false },
  negativeIssuesWithNeighbour: { type: String, required: false },
});

const educationalHistorySchema = new Schema({
  discontinuedSchool: { type: String, required: false },
  educationalHistory: { type: String, required: false },
  teacherReport: { type: String, required: false },
  overallPerformance: { type: String, required: false },
  typeOfSchooling: { type: String, required: false },
  ReasonForDiscontinuingSchooling: { type: String, required: false },
  ageOfAdmission: { type: String, required: false },
});

const playHistorySchema = new Schema({
  involvementInPlay: { type: String, required: false },
  observesOthersPlaying: { type: String, required: false },
  playBehaviour: { type: String, required: false },
  periodicity: { type: String, required: false },
});

const developmentalHistorySchema = new Schema({
  headControl: { type: String, required: false },
  rolling: { type: String, required: false },
  independentSitting: { type: String, required: false },
  crawling: { type: String, required: false },
  walking: { type: String, required: false },
  bilateralHoldingOfToys: { type: String, required: false },
  holdingSmallItems: { type: String, required: false },
  scribblingWithCrayon: { type: String, required: false },
  babbling: { type: String, required: false },
  firstWords: { type: String, required: false },
  twoWordsPhrases: { type: String, required: false },
  sentences: { type: String, required: false },
  smilesAtOthers: { type: String, required: false },
  respondsToName: { type: String, required: false },
  feedSelf: { type: String, required: false },
});

const assessmentSchema = new Schema({
  cognitive: { type: String, required: false },
  motor: { type: String, required: false },
  speechAndLanguage: { type: String, required: false },
  social: { type: String, required: false },
});

const medicalIllnessSchema = new Schema({
  significantMedicalIllness: { type: String, required: false },
  negativeReactionToMedication: { type: String, required: false },
});

const clientSchema = new Schema({
  student: {
    type: String,
    ref: "students",
    required: [true, "Student Required"],
  },
  purposeVisit: { type: String, required: false },
  previousConsultations: { type: Boolean, required: false },
  natureOfConsultations: { type: String, required: false },
  treatmentUndergone: { type: Boolean, required: false },
  typeOfTreatment: { type: String, required: false },
  therapeutic: { type: String, required: false },
  presentCondition: [presentConditionSchema],
  hasDysmorphicFeatures: { type: String, required: false },
  smallSizedHead: { type: String, required: false },
  ableToWalkAndRun: { type: String, required: false },
  noAgeAppropriateComprehensionAndSpeechDevelopment: { type: String, required: false },
  reachesGraspsAndManipulatesObjects: { type: String, required: false },
  emotionallyAttachedToParents: { type: String, required: false },
  hasAdequateEyeContactAndSocialSmile: { type: String, required: false },
  eatsSelf: { type: String, required: false },
  indicatesToiletNeeds: { type: String, required: false },
  medicalHistory: medicalHistorySchema,
  familyHistory: familyHistorySchema,
  socialHistory: socialHistorySchema,
  educationalHistory: educationalHistorySchema,
  playHistory: playHistorySchema,
  ageofAttainmentOfMenarche: { type: String, required: false },
  menstrualHistory: { type: String, required: false },
  anySignificantDetails: { type: String, required: false },
  vocationalTraining: { type: String, required: false },
  occupationalHistory: { type: String, required: false },
  employment: { type: String, required: false },
  developmentalHistory: developmentalHistorySchema,
  assessment: assessmentSchema,
  medicalIllness: medicalIllnessSchema,
});

module.exports = mongoose.model('studentdetails', clientSchema);
