import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentEval(params) {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const navigate = useNavigate();
  const username = pathname.split("/")[pathname.split("/").length - 1];

  const [UInfo, setUInfo] = useState(null);

  const [reports, setReports] = useState([]);
  const [extraQuestion, setExtraQuestion] = useState("");
  const [extraAnswer, setExtraAnswer] = useState("");
  const [extraArea, setExtraArea] = useState("");

  const [Submission, setSubmission] = useState(null);

  async function getStudentBasicDetails() {
    await axios
      .post(
        "http://localhost:4000/getstudentbasicdetails",
        { username: username },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!res.data.status) {
          navigate("/class");
        } else {
          setUInfo(res.data.data);
        }
      });
  }
  async function SubmitEvaluation(check) {
    reports.map(async (report) => {
      if (report._id == Submission) {
        await axios
          .post(
            "http://localhost:4000/studentevaluation",
            {
              studentusername: report.student,
              termYear: report.termYear,
              QAEvaluations: report.tests,
              checked: check,
              group:report.group
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });
  }
  async function getStudentEvaluation() {
    await axios
      .post(
        "http://localhost:4000/getstudentevaluation",
        { username: username },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status) {
          setReports(res.data.data);
        } else console.log("error fetch details");
      });
  }

  function addQuestion(e) {
    e.preventDefault();
    if (extraAnswer == "" || extraArea == "" || extraArea == "") {
      return;
    }
    reports.map((report) => {
      if (report._id == Submission) {
        report.tests.push({
          question: { _id:generateRandomId(), question: extraQuestion, area: extraArea },
          answer: extraAnswer,
        });
        return;
      }
    });
    setExtraAnswer("");
    setExtraArea("");
    setExtraQuestion("");
  }

  useEffect(() => {
    getStudentEvaluation();
  }, []);

  const handleQuestionChange = (rid,tid,value) => {
    const reps = reports
    reps.map((report) => {
      if(report._id == rid){
        report.tests.map(test=>{
          if(test._id == tid){
              test.question.question = value
          }
        });
      }
    })  
    setReports([...reps])
  }

  
  const handleAnswerChange = (rid,tid,value) => {
    const reps = reports
    reps.map((report) => {
      if(report._id == rid){
        report.tests.map(test=>{
          if(test._id == tid){
              test.answer= value
          }
        });
      }
    })  
    setReports([...reps])
  }

  const handleAreaChange = (rid,tid,value) => {
    const reps = reports
    reps.map((report) => {
      if(report._id == rid){
        report.tests.map(test=>{
          if(test._id == tid){
              test.question.area = value
          }
        });
      }
    })  
    setReports([...reps])
  }

  return (
    <div>
      {reports.length > 0 && (
        <>
          {reports.map((report, i) => {
            return (
              <div key={report._id}>
                {Submission == report._id ? (
                  <div key={report._id}>
                    <div>
                      <h2
                        onClick={() => {
                          setSubmission(
                            Submission == report._id ? null : report._id
                          );
                          setExtraAnswer("");
                          setExtraArea("");
                          setExtraQuestion("");
                        }}
                      >
                        report {i + 1}
                      </h2>
                      <h1>{report.termYear}</h1>
                      <h4>{report.group}</h4>

                      {report.tests &&
                        report.tests.map((test) => {
                          return (
                            <div key={test.q}>
                              <input type="text" value={test.question.question} onChange={(e)=>{handleQuestionChange(report._id,test._id,e.target.value)}} />
                              <select
                              id="areas"
                              value={test.question.area}
                              onChange={(e) => handleAreaChange(report._id,test._id,e.target.value)}
                            >
                              <option value="">--Please choose an option--</option>
                              <option value="PRIMARY">PRIMARY</option>
                            </select>
                                  <select
                              id="answers"
                              value={test.answer}
                              onChange={(e) => handleAnswerChange(report._id,test._id,e.target.value)}
                            >
                              <option value="">--Please choose an option--</option>
                              <option value="YES">YES</option>
                            </select>
                            </div>
                          );
                        })}

                      <input
                        type="text"
                        value={extraQuestion}
                        onChange={(e) => {
                          setExtraQuestion(e.target.value);
                        }}
                      />
                      <select
                        id="area"
                        value={extraArea}
                        onChange={(e) => {
                          setExtraArea(e.target.value);
                        }}
                      >
                        <option value="">--Please choose an option--</option>
                        <option value="PERSONAL">PERSONAL</option>
                      </select>
                      <select
                        id="answers"
                        value={extraAnswer}
                        onChange={(e) => setExtraAnswer(e.target.value)}
                      >
                        <option value="">--Please choose an option--</option>
                        <option value="YES">YES</option>
                      </select>
                      <button onClick={addQuestion}>Add Question</button>
                      {/* TODO code to add another question to the report and submit it  : completed*/}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          SubmitEvaluation(false);
                        }}
                      >
                        {" "}
                        Save the progress{" "}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          SubmitEvaluation(true);
                        }}
                      >
                        {" "}
                        Submit and proceed to evaluation{" "}
                      </button>

                      {/* TODO buttons to save the progress and another for submit and proceed to promotion */}
                    </div>
                  </div>
                ) : (
                  <>
                    <h5
                      onClick={() => {
                        setSubmission(
                          Submission == report._id ? null : report._id
                        );
                        setExtraAnswer("");
                        setExtraArea("");
                        setExtraQuestion("");
                      }}
                    >
                      {" "}
                      {report._id}{" "}
                    </h5>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
export default StudentEval;


function generateRandomId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // Add a timestamp to ensure uniqueness
  const timestamp = new Date().getTime().toString();

  for (let i = 0; i < length; i++) {
    // Generate a random character from the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  // Append the timestamp to the random string
  result += timestamp;

  return result;
}
