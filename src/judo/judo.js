import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import JUDO2 from "../fitness/JUDO2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollAnimation from '../ScrollAnimation';

const steps = ['Introduction', 'Schedule', 'Tarifs'];

export default function JUDO() {
  const navigate = useNavigate();
  const [dataf, setdataf] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    response();
  }, []);

  const response = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/specialite/${1}`);

      setdataf(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    setSkipped(newSkipped);

    if (nextStep === steps.length) {
      navigate("/specialite");
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    navigate("/");
  };

  return (
    <ScrollAnimation>
      <div className="relative text-white">
        <img src={JUDO2} className="w-full h-screen" />
        <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
          <div className="w-11/12 h-3/4 p-1">
            <Box sx={{ height: "100%", backgroundColor: "#000000c9", color: "white", border: "solid 1px red", borderRadius: "10px", padding: "1%" }}>
              <Stepper activeStep={activeStep} className="md:w-full">
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
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }} className="heigthp">
                  {activeStep === 0 ? (
                    <div className='w-full h-full flex items-center justify-center'>
                      {Loading ? <div className="loader">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                      </div> : dataf.length === 0 ? (
                        <div className="loader">
                          <div data-glitch="No data available" className="glitch">No data available</div>
                        </div>

                      ) :
                        <div className="flex flex-col md:flex md:flex-row mx-3 items-center h-80 md:h-96 justify-between md:space-x-10">
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
                      }


                    </div>
                  ) : activeStep === 1 ? (
                    <div className="w-full flex-col h-full flex items-center justify-center">
                      {Loading ? <div className="loader">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                      </div> : dataf.length === 0 ? (
                        <div className="loader">
                          <div data-glitch="No data available" className="glitch">No data available</div>
                        </div>

                      ) : <div>
                        <div className='flex flex-col'>
                          <p className='text-red-700 md:text-2xl text-lg font-bold'>Schedule of specialitie</p>
                          <p className='text-center'>for men and women</p>
                        </div>
                        <img src={`http://127.0.0.1:8000/storage/photos/specialities/${dataf.emploi_sp}`} alt="" className="h-60" />
                      </div>
                      }

                    </div>
                  ) : (
                    <div className='flex md:flex-row flex-col w-full h-full items-center justify-center space-x-0 space-y-2 md:space-x-5'>
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
                  )}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
            </Box>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}
