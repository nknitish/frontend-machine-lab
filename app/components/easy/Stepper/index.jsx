"use client";

import React, { useState } from "react";

const Step = ({ children }) => children;

const Stepper = ({ steps, activeStep, onStepChange, children }) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = index < activeStep;
          const active = index === activeStep;

          return (
            <React.Fragment key={step.label}>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => onStepChange(index)}
              >
                {/* Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${
                      completed
                        ? "bg-green-500 border-green-500 text-white"
                        : active
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white border-gray-400 text-gray-500"
                    }
                  `}
                >
                  {completed ? "✓" : index + 1}
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-sm font-medium ${
                    active
                      ? "text-blue-600"
                      : completed
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-3 rounded transition-all duration-300 ${
                    completed ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-10 border rounded-lg p-6 shadow-sm bg-white">
        {childArray[activeStep]}
      </div>
    </div>
  );
};

export default function App() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Account" },
    { label: "Profile" },
    { label: "Payment" },
    { label: "Success" },
  ];

  const next = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        >
          <Step>
            <h2 className="text-2xl font-bold">Account</h2>
            <p>Create your account.</p>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold">Profile</h2>
            <p>Fill your profile information.</p>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold">Payment</h2>
            <p>Enter payment details.</p>
          </Step>

          <Step>
            <h2 className="text-2xl font-bold">Success 🎉</h2>
            <p>Your registration is complete.</p>
          </Step>
        </Stepper>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={activeStep === 0}
            className="px-6 py-2 rounded bg-gray-500 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={next}
            disabled={activeStep === steps.length - 1}
            className="px-6 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
