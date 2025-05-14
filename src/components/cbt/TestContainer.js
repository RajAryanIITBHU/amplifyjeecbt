"use client"
import React, { useState, useEffect } from "react";
import AuthScreen from "./auth/authScreen";
import InstructionScreen from "./instructions/InstructionScreen";
import TestInterface from "./test/TestInterface";
import ResultScreen from "./results/ResultScreen";
import LoadingScreen from "./common/LoadingScreen";
import { mockTestData } from "./data/mockData"; 
import { calculateResults } from "./utils/calculateResults"; 

// Test flow states
const TEST_STATES = {
  LOADING: "loading",
  AUTH: "auth",
  INSTRUCTIONS: "instructions",
  PRE_TEST: "pre-test",
  TEST: "test",
  ENDED: "ended",
};

const TestContainer = ({user}) => {
  const [testState, setTestState] = useState(TEST_STATES.LOADING);
  const [testData, setTestData] = useState(null);
  const [userData, setUserData] = useState({
    ...user,
    isAuthenticated: false,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [currentInstructionStep, setCurrentInstructionStep] = useState(1);
  const [answers, setAnswers] = useState({});

  // Simulate loading test data
  useEffect(() => {
    const loadTestData = async () => {
      // In a real app, this would fetch from an API
      setTimeout(() => {
        setTestData(mockTestData);
        setTestState(TEST_STATES.AUTH);
      }, 1500);
    };

    loadTestData();
  }, []);

  // Handle authentication
  const handleAuthenticate = (formData) => {
    // In a real app, this would validate against an API
    setUserData({
      ...userData,
      rollNo: formData.rollNo,
      isAuthenticated: true,
    });

    // Add animation with a slight delay for better UX
    setTimeout(() => {
      setTestState(TEST_STATES.INSTRUCTIONS);
    }, 300);
  };

  // Handle moving through instruction steps
  const handleInstructionNext = () => {
    if (currentInstructionStep < 2) {
      setCurrentInstructionStep(currentInstructionStep + 1);
    } else {
      setTestState(TEST_STATES.PRE_TEST);
    }
  };

  const handleInstructionPrev = () => {
    if (currentInstructionStep > 1) {
      setCurrentInstructionStep(currentInstructionStep - 1);
    } else {
      setTestState(TEST_STATES.AUTH);
      setUserData((prev) => ({ ...prev, isAuthenticated: false }));
    }
  };

  // Handle starting the test
  const handleStartTest = () => {
    if (!acceptedTerms) return;

    setTestState(TEST_STATES.TEST);

    // Try to request fullscreen for better test experience
    try {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Could not enter fullscreen mode", err);
      });
    } catch (err) {
      console.warn("Fullscreen API not supported", err);
    }
  };

  // Handle answer updates
  const handleAnswerUpdate = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Handle submitting the test
  const handleEndTest = () => {
    // Calculate results using the utility function
    console.log(answers)
    const results = calculateResults(testData, answers);
    setTestResults(results);

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.warn("Error exiting fullscreen:", err);
      });
    }

    // Use setTimeout to create a loading effect before showing results
    setTimeout(() => {
      setTestState(TEST_STATES.ENDED);
    }, 1000);
  };

  // Render the appropriate component based on test state
  const renderTestStage = () => {
    switch (testState) {
      case TEST_STATES.LOADING:
        return <LoadingScreen message="Preparing Your Test Environment" />;

      case TEST_STATES.AUTH:
        return (
          <AuthScreen onAuthenticate={handleAuthenticate} userData={userData} />
        );

      case TEST_STATES.INSTRUCTIONS:
      case TEST_STATES.PRE_TEST:
        return (
          <InstructionScreen
            step={currentInstructionStep}
            isPreTest={testState === TEST_STATES.PRE_TEST}
            onNext={handleInstructionNext}
            onPrev={handleInstructionPrev}
            onStartTest={handleStartTest}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            userData={userData}
          />
        );

      case TEST_STATES.TEST:
        return (
          <TestInterface
            testData={testData}
            userData={userData}
            onEndTest={handleEndTest}
            onAnswerUpdate={handleAnswerUpdate}
            answers={answers}
          />
        );

      case TEST_STATES.ENDED:
        return <ResultScreen results={testResults} userData={userData} />;

      default:
        return <LoadingScreen />;
    }
  };

  return <div className="min-h-screen flex flex-col">{renderTestStage()}</div>;
};

export default TestContainer;
