import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./crossfitmaterial.css"
import axios from "axios";

const steps = ['Introduction', 'Schedule', 'Coaches'];

export default function Crossmaterial() {
  const [data, setData] = useState({})
  useEffect(() => {
    res2()
  }, [])
  const res2 = async () => {
    const getD = await axios.get('http://127.0.0.1:8000/api/specialite')
    if (getD) {
      setData(getD.data[1])
    }
  }

  
  console.log(data);
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/");
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    navigate("/")

  };


  return (
    <div className='w-screen h-screen'>
      <div className="childcrossfitmaterialp">
        <Box sx={{ width: '100%', height: "300px", backgroundColor: "#000000c9", color: "white", border: "2px solid red" }} >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel className="step-label" {...labelProps} >{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (

            <React.Fragment>

              <Typography sx={{ mt: 2, mb: 1 }}>
                <div>
                  hello world
                </div>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Rolback</Button>
              </Box>
            </React.Fragment>
          ) : (

            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }} id="xx">
                {activeStep == 0 ? <div className="introduction_crossfit">
                  <div className="videonamecrossfit">
                    {data.video_intro && <video width="400px" height="150px" autoPlay>
                      <source src={data.video_intro} type="video/mp4" />
                      hhhh
                    </video>}
                    <p className="intro_spécialité">welcome to {data["nom_specialité"]} world</p>
                  </div>
                  <div className="descriptcrossfit" >
                    <p className="intro_spécialité">{data.description}</p>
                  </div>



                </div> : activeStep == 1 ? <img src={data.emploi_sp} alt="" width="100px" height="200px" /> : <div>
                  <p>Created At: {data.created_at}</p>
                  <p>Updated At: {data.updated_at}</p>
                </div>
                }
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} >
                <Button
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : <span style={{ color: "red" }}>Next</span>}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>

    </div>
  );
}