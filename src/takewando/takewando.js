import "./takewando.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ScrollAnimation from "../ScrollAnimation";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import takewando from "../fitness/takewando.png"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const steps = ['Introduction', 'Schedule', 'Tarifs'];

export default function Takewando() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [dataf, setdataf] = useState([])
  const [skipped, setSkipped] = React.useState(new Set());
  useEffect(() => {
    response()
  }, [])
  const response = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get(`http://127.0.0.1:8000/api/specialite/${2}`)
      setdataf(res.data)
    }
    catch (error) {
      console.log(error)
    }
    console.log(dataf)
  }
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
    <ScrollAnimation>
      <div className="relative text-white">
      <img src={takewando} className="w-full h-screen" />
      <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
        <div className="w-11/12 h-3/4 p-1 ">
          <Box sx={{ height: "100%", backgroundColor: "#000000c9", color: "white", border: "solid 1px red", padding: "1%" }}>
            <Stepper activeStep={activeStep} className="md:w-full  ">
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps} className={`md:text-base text-red-700 ${index === activeStep ? 'text-xs-mobile' : ''}`} >
                    <StepLabel className={`label-step-client ${index === activeStep ? 'text-xs-mobile' : ''}`} {...labelProps} >{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (

              <React.Fragment>

                <Typography sx={{ mt: 2, mb: 1 }} className="heigthp">
                  <div>
                    hello world
                  </div>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset} className="text-red-700">Rolback</Button>
                </Box>
              </React.Fragment>
            ) : (

              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }} className="heigthp">
                  {activeStep == 0 ? <div className="">
                    <div className="flex flex-col md:flex md:flex-row mx-3 items-center h-80 md:h-96  justify-between md:space-x-10">
                      {dataf.video_intro && (
                        <div className='w-full md:w-1/2'>
                          <video width="600px" height="150px" controls loop autoPlay className='rounded-lg'>
                            <source src={`/${dataf.video_intro}`} type="video/mp4" />
                          </video>
                        </div>
                      )}
                      <div className="w-full md:text-base font-bold text-xs md:w-1/2">
                        <p className="">{dataf.description}</p>
                      </div>

                    </div>
                  </div> : activeStep == 1 ? <div className="w-full  h-full flex flex-col items-center justify-center"><div className='flex flex-col '>
                    <p className='text-red-700 md:text-2xl text-lg font-bold'>Schedule of specialitie</p>
                    <p className='text-center'>for men and women</p>
                    </div><img src={`http://127.0.0.1:8000/storage/photos/specialities/${dataf.emploi_sp}`} alt="" className="h-60" /></div> : <div className='flex md:flex-row flex-col w-full h-full md:items-end items-center md:justify-center justify-start py-3 space-x-0 space-y-2 md:space-x-5'>
                    <div className='md:w-72 w-32 flex-col rounded-lg border p-5 h-24 md:h-72 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
                      <p className='md:text-2xl text-base font-bold'>For 1 month</p>
                      <p className='text-red-700 text-lg md:text-xl font-bold'>{parseFloat(dataf.price)} MAD</p>
                    </div>
                    <div className='md:w-72 w-32 flex-col rounded-lg border p-5 h-24 md:h-72 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
                      <p className='md:text-2xl text-base font-bold'>For 2 month</p>
                      <p className='text-red-700 text-lg md:text-xl font-bold'>{parseInt(dataf.price) * parseInt(2)} MAD</p>
                    </div>
                    <div className='md:w-72 w-32 flex-col rounded-lg border p-5 h-24 md:h-72 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
                      <p className='md:text-2xl text-base font-bold'>For 3 month</p>
                      <p className='text-red-700 text-lg md:text-xl font-bold'>{parseInt(dataf.price) * parseInt(3)} MAD</p>
                    </div>

                  </div>
                  }
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    // disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} >
                    {activeStep === steps.length - 1 ? 'Finish' : <span style={{ color: "red" }}>Next</span>}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </div>

    </ScrollAnimation>
    
  );
}