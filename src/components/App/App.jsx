import { useState, useEffect } from 'react';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';
import Description from '../Description/Description';
import styles from './App.module.css';

function App() {
  // Отримуємо дані з localStorage при ініціалізації
  const [feedback, setFeedback] = useState(() => {
    // Отримуємо збережені відгуки, або ініціалізуємо їх за замовчуванням
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  // Зберігаємо дані в localStorage, коли feedback змінюється
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem('feedback', JSON.stringify(feedback));
    }
  }, [feedback]); // Цей ефект спрацює, коли стан feedback зміниться

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => {
      const updatedFeedback = { ...prevFeedback, [feedbackType]: prevFeedback[feedbackType] + 1 };
      return updatedFeedback;
    });
  };

  const resetFeedback = () => {
    const resetState = { good: 0, neutral: 0, bad: 0 };
    setFeedback(resetState);
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div className={styles.app}>
      <Description />
      <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
