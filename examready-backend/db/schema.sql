-- ExamReady Africa Database Schema

-- Database name: examready_db
DROP DATABASE IF EXISTS examready_db;
CREATE DATABASE examready_db;
USE examready_db;

-- Questions Table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation TEXT,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Attempts Table
CREATE TABLE quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sample Questions
INSERT INTO questions 
(topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation) 
VALUES
(
    'Algebra',
    'What is the value of x in 2x + 4 = 10?',
    '2', '3', '4', '5',
    'B',
    'Subtract 4 from both sides to get 2x = 6, then divide by 2 to get x = 3'
),
(
    'Algebra',
    'Simplify: 3x + 2x',
    '6x', '5x', '5', '6',
    'B',
    'Combine like terms: 3x + 2x = 5x'
),
(
    'Fractions',
    'What is 1/2 + 1/4?',
    '2/6', '3/4', '1/3', '2/4',
    'B',
    'Convert to common denominator: 2/4 + 1/4 = 3/4'
),
(
    'Fractions',
    'What is 3/4 of 40?',
    '10', '20', '30', '35',
    'C',
    'Multiply 40 by 3/4: (40 × 3) ÷ 4 = 120 ÷ 4 = 30'
),
(
    'Geometry',
    'What is the area of a rectangle with length 5 and width 3?',
    '8', '15', '16', '10',
    'B',
    'Area of rectangle = length × width = 5 × 3 = 15'
);
