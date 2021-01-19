import React from 'react'
import "../../styles/Instructions.css"

function Instructions() {
      
      return (
            <div className="home__instructions">
                  <div className="home__instructions-hire block">
                        <h2 className="home__instructions-title">Hire care</h2>
                        <div className="card">
                              <h3><i className="far fa-address-card"></i> Get Started</h3>
                              <p>Create your free profile. Post jobs for the help you want and start connecting today</p>
                        </div>
                        <div className="card">
                              <h3><i className="fas fa-search"></i> Select Candidates</h3>
                              <p>Find candidates with our search. Add favorites, send message or book an appointment </p>
                        </div>
                        <div className="card">
                              <h3><i className="fas fa-bullseye"></i> Interview and Hire</h3>
                              <p>Get background checks, discuss by message, conduct online interviews</p>
                        </div>
                  </div>

                  <div className="home__instructions-find block">
                        <h2 className="home__instructions-title">Find job</h2>
                        <div className="card">
                              <h3><i className="far fa-address-card"></i> Get Started</h3>
                              <p>Create your free profile and post your profile</p>
                        </div>
                        <div className="card">
                              <h3><i className="fas fa-search"></i> Select Jobs</h3>
                              <p>Find jobs with our search. Send your application or send message</p>
                        </div>
                        <div className="card">
                              <h3><i className="fas fa-bullseye"></i> Interview and Contract</h3>
                              <p>Get more information through messages, conduct online interviews</p>
                        </div>
                  </div>
            </div>
      )
}

export default Instructions;
