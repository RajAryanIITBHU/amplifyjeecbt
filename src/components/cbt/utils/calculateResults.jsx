export const calculateResults = (testData, answers) => {
  if (!testData || !answers) return null;

  const subjects = ['physics', 'chemistry', 'mathematics'];
  let totalMarks = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalAnswered = 0;
  let totalUnanswered = 0;
  let totalPossibleMarks = 0;
  
  const subjectResults = {};

  subjects.forEach(subject => {
    if (!testData[subject]) return;
    
    let subjectMarks = 0;
    let subjectCorrect = 0;
    let subjectIncorrect = 0;
    let subjectUnattempted = 0;
    let subjectTotal = 0;
    
    testData[subject].forEach(section => {
      const sectionType = section.type;
      const questionMarks = parseInt(section.marks) || 0;
      const negativeMarks = parseInt(section.negative) || 0;
      
      section.questions.forEach(question => {
        subjectTotal += questionMarks;
        const userAnswer = answers[question.id];
        
        if (userAnswer === undefined || userAnswer === null) {
          subjectUnattempted++;
          return;
        }
        
        totalAnswered++;
        
        // Check answers based on question type
        if (sectionType === 'mcq-single') {
          const isCorrect = userAnswer === question.correctOption;
          if (isCorrect) {
            subjectMarks += questionMarks;
            subjectCorrect++;
            totalCorrect++;
          } else {
            subjectMarks -= negativeMarks;
            subjectIncorrect++;
            totalIncorrect++;
          }
        } 
        else if (sectionType === 'mcq-multiple') {
          if (Array.isArray(userAnswer) && userAnswer.length > 0) {
            const correctOptions = Array.isArray(question.correctOptions) 
              ? question.correctOptions 
              : [question.correctOption];
            
            const correctSelected = userAnswer.filter(opt => correctOptions.includes(opt));
            const incorrectSelected = userAnswer.filter(opt => !correctOptions.includes(opt));
            
            if (incorrectSelected.length > 0) {
              // Incorrect combination selected
              subjectMarks -= negativeMarks;
              subjectIncorrect++;
              totalIncorrect++;
            } else if (correctSelected.length === correctOptions.length) {
              // All correct options selected
              subjectMarks += questionMarks;
              subjectCorrect++;
              totalCorrect++;
            } else {
              // Partial credit based on number of correct options selected
              const partialCredit = Math.ceil((correctSelected.length / correctOptions.length) * questionMarks);
              subjectMarks += partialCredit;
              subjectCorrect += (correctSelected.length / correctOptions.length);
              totalCorrect += (correctSelected.length / correctOptions.length);
            }
          }
        }
        else if (sectionType === 'numerical') {
          const isCorrect = userAnswer === question.correctAnswer;
          if (isCorrect) {
            subjectMarks += questionMarks;
            subjectCorrect++;
            totalCorrect++;
          } else {
            subjectIncorrect++;
            totalIncorrect++;
          }
        }
        else if (sectionType === 'matching') {
          // For matching questions
          if (typeof userAnswer === 'object' && userAnswer !== null) {
            const correctMatches = Object.entries(userAnswer).filter(([item, value]) => {
              return question.correctMatches && question.correctMatches[item] === value;
            });
            
            if (correctMatches.length === Object.keys(question.correctMatches || {}).length) {
              subjectMarks += questionMarks;
              subjectCorrect++;
              totalCorrect++;
            } else {
              subjectIncorrect++;
              totalIncorrect++;
            }
          }
        }
      });
    });
    
    totalMarks += subjectMarks;
    totalPossibleMarks += subjectTotal;
    totalUnanswered += subjectUnattempted;
    
    subjectResults[subject] = {
      marks: subjectMarks,
      total: subjectTotal,
      correct: subjectCorrect,
      incorrect: subjectIncorrect,
      unattempted: subjectUnattempted
    };
  });
  
  // Calculate percentile (mock value for now)
  const percentile = Math.round(Math.min(100, (totalMarks / totalPossibleMarks) * 100 + 25));
  
  return {
    marks: totalMarks,
    total: totalPossibleMarks,
    totalCorrect,
    totalIncorrect,
    totalAnswered,
    totalUnanswered,
    percentile,
    physics: subjectResults.physics,
    chemistry: subjectResults.chemistry,
    mathematics: subjectResults.mathematics
  };
};