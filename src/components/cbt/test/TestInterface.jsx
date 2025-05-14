import React, { useState, useEffect, useCallback } from "react";
import TestHeader from "./TestHeader";
import QuestionDisplay from "./QuestionDisplay";
import QuestionNavigation from "./QuestionNavigation";
import TestActions from "./TestActions";
import ConfirmDialog from "../common/ConfirmDialog";

const TestInterface = ({
  testData,
  userData,
  onEndTest,
  onAnswerUpdate,
  answers,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(10800); // 3 hours in seconds
  const [warnings, setWarnings] = useState(0);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [testState, setTestState] = useState({
    currentSubject: "physics",
    currentSection: 0,
    currentQuestion: 0,
    questionStatus: {},
  });

  // Initialize question status
  useEffect(() => {
    if (!testData) return;

    const initialStatus = {};
    ["physics", "chemistry", "mathematics"].forEach((subject) => {
      if (!testData[subject]?.length) return;

      testData[subject].forEach((section, sectionIndex) => {
        section.questions.forEach((question, qIndex) => {
          initialStatus[question.id] = {
            subject,
            sectionIndex,
            indexInSection: qIndex,
            visited: false,
            answered: false,
            markedForReview: false,
          };
        });
      });
    });

    setTestState((prev) => ({
      ...prev,
      questionStatus: initialStatus,
    }));

    // Set initial question
    const initialSubject = testData.physics?.length
      ? "physics"
      : testData.chemistry?.length
      ? "chemistry"
      : "mathematics";

    setTestState((prev) => ({
      ...prev,
      currentSubject: initialSubject,
      currentSection: 0,
      currentQuestion: 0,
    }));
  }, [testData]);

  // Update question status when answers change
  useEffect(() => {
    if (!testData || !answers) return;

    setTestState((prev) => {
      const updatedStatus = { ...prev.questionStatus };

      Object.entries(answers).forEach(([questionId, answer]) => {
        if (updatedStatus[questionId]) {
          updatedStatus[questionId] = {
            ...updatedStatus[questionId],
            answered:
              answer !== null &&
              !(Array.isArray(answer) && answer.length === 0) &&
              !(typeof answer === "object" && Object.keys(answer).length === 0),
          };
        }
      });

      return {
        ...prev,
        questionStatus: updatedStatus,
      };
    });
  }, [answers, testData]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onEndTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onEndTest]);

  // Get current question
  const getCurrentQuestion = useCallback(() => {
    if (!testData || !testData[testState.currentSubject]?.length) return null;

    const currentSection =
      testData[testState.currentSubject][testState.currentSection];
    if (!currentSection?.questions?.length) return null;

    return currentSection.questions[testState.currentQuestion];
  }, [
    testData,
    testState.currentSubject,
    testState.currentSection,
    testState.currentQuestion,
  ]);

  // Mark question as visited
  useEffect(() => {
    const question = getCurrentQuestion();
    if (!question) return;

    setTestState((prev) => ({
      ...prev,
      questionStatus: {
        ...prev.questionStatus,
        [question.id]: {
          ...prev.questionStatus[question.id],
          visited: true,
        },
      },
    }));
  }, [getCurrentQuestion]);

  // Handle answer selection
  const handleAnswer = (questionId, answer) => {
    onAnswerUpdate(questionId, answer);
  };

  // Handle marking for review
  const handleMarkForReview = () => {
    const question = getCurrentQuestion();
    if (!question) return;

    setTestState((prev) => ({
      ...prev,
      questionStatus: {
        ...prev.questionStatus,
        [question.id]: {
          ...prev.questionStatus[question.id],
          markedForReview: !prev.questionStatus[question.id]?.markedForReview,
        },
      },
    }));
  };

  // Navigate to next question
  const handleNext = () => {
    const currentSection =
      testData[testState.currentSubject][testState.currentSection];
    const questionsInSection = currentSection.questions.length;

    if (testState.currentQuestion < questionsInSection - 1) {
      setTestState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      return;
    }

    if (
      testState.currentSection <
      testData[testState.currentSubject].length - 1
    ) {
      setTestState((prev) => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0,
      }));
      return;
    }

    const subjects = ["physics", "chemistry", "mathematics"];
    const currentSubjectIndex = subjects.indexOf(testState.currentSubject);

    for (let i = currentSubjectIndex + 1; i < subjects.length; i++) {
      if (testData[subjects[i]]?.length > 0) {
        setTestState((prev) => ({
          ...prev,
          currentSubject: subjects[i],
          currentSection: 0,
          currentQuestion: 0,
        }));
        return;
      }
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (testState.currentQuestion > 0) {
      setTestState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
      return;
    }

    if (testState.currentSection > 0) {
      const prevSectionQuestions =
        testData[testState.currentSubject][testState.currentSection - 1]
          .questions.length;
      setTestState((prev) => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSectionQuestions - 1,
      }));
      return;
    }

    const subjects = ["physics", "chemistry", "mathematics"];
    const currentSubjectIndex = subjects.indexOf(testState.currentSubject);

    for (let i = currentSubjectIndex - 1; i >= 0; i--) {
      if (testData[subjects[i]]?.length > 0) {
        const lastSectionIndex = testData[subjects[i]].length - 1;
        const lastQuestionIndex =
          testData[subjects[i]][lastSectionIndex].questions.length - 1;

        setTestState((prev) => ({
          ...prev,
          currentSubject: subjects[i],
          currentSection: lastSectionIndex,
          currentQuestion: lastQuestionIndex,
        }));
        return;
      }
    }
  };

  // Go to specific question
  const handleGoToQuestion = (subject, sectionIndex, questionIndex) => {
    setTestState((prev) => ({
      ...prev,
      currentSubject: subject,
      currentSection: sectionIndex,
      currentQuestion: questionIndex,
    }));
  };

  // Clear response for current question
  const handleClearResponse = () => {
    const question = getCurrentQuestion();
    if (!question) return;
    onAnswerUpdate(question.id, null);
  };

  const currentQuestion = getCurrentQuestion();
  const sectionType =
    testData?.[testState.currentSubject]?.[testState.currentSection]?.type;
  const isMarkedForReview = currentQuestion
    ? testState.questionStatus[currentQuestion.id]?.markedForReview
    : false;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TestHeader
        timeRemaining={timeRemaining}
        warnings={warnings}
        currentSubject={testState.currentSubject}
        testData={testData}
        onSubjectChange={(subject) =>
          setTestState((prev) => ({
            ...prev,
            currentSubject: subject,
            currentSection: 0,
            currentQuestion: 0,
          }))
        }
        onSectionChange={(sectionIndex) =>
          setTestState((prev) => ({
            ...prev,
            currentSection: sectionIndex,
            currentQuestion: 0,
          }))
        }
      />

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="flex gap-6 flex-1">
          <div className="w-2/3">
            <QuestionDisplay
              question={currentQuestion}
              sectionType={sectionType}
              selectedAnswer={answers[currentQuestion?.id]}
              onAnswer={handleAnswer}
            />
          </div>

          <div className="w-1/3">
            <QuestionNavigation
              testData={testData}
              currentSubject={testState.currentSubject}
              currentSection={testState.currentSection}
              questionStatus={testState.questionStatus}
              onQuestionSelect={handleGoToQuestion}
            />
          </div>
        </div>
      </div>

      <TestActions
        onPrevious={handlePrevious}
        onNext={handleNext}
        onClear={handleClearResponse}
        onMarkForReview={handleMarkForReview}
        onEndTest={() => setShowConfirmEnd(true)}
        isMarkedForReview={isMarkedForReview}
      />

      <ConfirmDialog
        isOpen={showConfirmEnd}
        title="Submit Test"
        message="Are you sure you want to end the test? Once submitted, you cannot return to the test."
        confirmLabel="Yes, Submit Test"
        cancelLabel="No, Continue Test"
        onConfirm={onEndTest}
        onCancel={() => setShowConfirmEnd(false)}
        variant="warning"
      />
    </div>
  );
};

export default TestInterface;
