import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MathJax from 'react-mathjax2';
import './Editor.css';

const Editor = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch('/sampl.json')
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data.questions);
        if (data.questions.length > 0) {
          const initialQuestion = data.questions[0];
          setQuestion(initialQuestion.stem.en);
          setOptions(initialQuestion.options.en);
        }
      });
  }, []);
 

  const handleQuestionChange = (event, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };

  const handleOptionChange = (index, event, editor) => {
    const updatedOptions = [...options];
    updatedOptions[index] = editor.getData();
    setOptions(updatedOptions);
  };

  const saveChanges = () => {
    console.log('Question:', question);
    console.log('Options:', options);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = quizData[nextIndex];
      setQuestion(nextQuestion.stem.en);
      setOptions(nextQuestion.options.en);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const prevQuestion = quizData[prevIndex];
      setQuestion(prevQuestion.stem.en);
      setOptions(prevQuestion.options.en);
    }
  };

  return (
    <MathJax.Context input='text'>
      <div className="editor-container">
        <h2>Edit Question</h2>
        <div className="question-editor">
          <CKEditor
            editor={ClassicEditor}
            data={question}
            onChange={handleQuestionChange}
          />
        </div>
        <h2>Edit Options</h2>
        <div className="options-editor">
          {options.map((option, index) => (
            <div key={index} className="option-editor">
              <CKEditor
                editor={ClassicEditor}
                data={option}
                onChange={(event, editor) => handleOptionChange(index, event, editor)}
              />
            </div>
          ))}
        </div>
        <button onClick={saveChanges}>Save Changes</button>
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex >= quizData.length - 1}>Next</button>
        <div className="mathjax-preview">
          <h3>Preview</h3>
          <p>{`Question: ${question}`}</p>
          <ul>
            {options.map((option, index) => (
              <li key={index}>{`Option ${index + 1}: ${option}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </MathJax.Context>
  );
};

export default Editor;
