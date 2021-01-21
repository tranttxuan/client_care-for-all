import React from 'react'
import "../../styles/Home/Instructions.css"

function Instructions() {

      return (
            <div className="flex-column home__instructions">
                  <h1>How it work?</h1>
                  <div>

                        <div className="flex-column">
                              <h2 >Hire care</h2>
                              <div className="flex-column section">
                                    <div className="card flex-row">
                                          <h3><i className="far fa-address-card"></i> Get Started</h3>
                                          <p>Create your free profile. Post jobs for the help you want and start connecting today</p>
                                    </div>
                                    <div className="card flex-row">
                                          <h3><i className="fas fa-search"></i> Select Candidates</h3>
                                          <p>Find candidates with our search. Add favorites, send message or book an appointment </p>
                                    </div>
                                    <div className="card flex-row">
                                          <h3><i className="fas fa-bullseye"></i> Interview and Hire</h3>
                                          <p>Get background checks, discuss by message, conduct online interviews</p>
                                    </div>
                              </div>

                        </div>

                        <div className="flex-column">
                              <h2 className="">Find job</h2>
                              <div className="flex-column section">
                                    <div className="card flex-row">
                                          <h3><i className="far fa-address-card"></i> Get Started</h3>
                                          <p>Create your free profile and post your profile</p>
                                    </div>
                                    <div className="card flex-row">
                                          <h3><i className="fas fa-search"></i> Select Jobs</h3>
                                          <p>Find jobs with our search. Send your application or send message</p>
                                    </div>
                                    <div className="card flex-row">
                                          <h3><i className="fas fa-bullseye"></i> Interview and Contract</h3>
                                          <p>Get more information through messages, conduct online interviews</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>

      )
}

export default Instructions;
