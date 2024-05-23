import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentEval(params) {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const navigate = useNavigate();

  const [UInfo, setUInfo] = useState(null);

  async function getStudentBasicDetails() {
    await axios
      .post(
        "http://localhost:4000/getstudentbasicdetails",
        { username: pathname.split("/")[pathname.split("/").length - 1] },
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
  async function SubmitEvaluation() {}

  useEffect(() => {
    getStudentBasicDetails();
  }, []);

  return <div>{UInfo && <>{UInfo.Name}</>}</div>;
}

export default StudentEval;
