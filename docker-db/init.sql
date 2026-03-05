CREATE DATABASE IF NOT EXISTS myapp_dev;
USE myapp_dev;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
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

-- Quiz Attempts Table
CREATE TABLE quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(100),
    score INT NOT NULL,
    total_questions INT NOT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('Mathematics', 'Algebra', 'What is the value of x in 2x + 4 = 10?', '2', '3', '4', '5', 'B', 'Subtract 4 from both sides to get 2x = 6, then divide by 2 to get x = 3.'),
('Mathematics', 'Algebra', 'Simplify: 3x + 2x', '6x', '5x', '5', '6', 'B', 'Combine like terms: 3x + 2x = 5x.'),
('Mathematics', 'Fractions', 'What is 1/2 + 1/4?', '2/6', '3/4', '1/3', '2/4', 'B', 'Convert to common denominator: 2/4 + 1/4 = 3/4.'),
('Mathematics', 'Fractions', 'What is 3/4 of 40?', '10', '20', '30', '35', 'C', 'Multiply 40 by 3/4: (40 x 3) / 4 = 120 / 4 = 30.'),
('Mathematics', 'Geometry', 'What is the area of a rectangle with length 5 and width 3?', '8', '15', '16', '10', 'B', 'Area of rectangle = length x width = 5 x 3 = 15.');

INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('Biology', 'Cell Biology', 'Which organelle is known as the powerhouse of the cell?', 'Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus', 'C', 'Mitochondria produce ATP through cellular respiration.'),
('Biology', 'Cell Biology', 'What is the function of the nucleus?', 'Produce energy', 'Control cell activities', 'Make proteins', 'Store water', 'B', 'The nucleus controls all cell activities and contains DNA.'),
('Biology', 'Photosynthesis', 'What gas do plants absorb during photosynthesis?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 'C', 'Plants absorb CO2 and release oxygen during photosynthesis.'),
('Biology', 'Photosynthesis', 'Where does photosynthesis take place?', 'Mitochondria', 'Chloroplast', 'Nucleus', 'Vacuole', 'B', 'Photosynthesis takes place in the chloroplasts.');

INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('Chemistry', 'Periodic Table', 'What is the chemical symbol for Gold?', 'Go', 'Gd', 'Au', 'Ag', 'C', 'Gold symbol Au comes from the Latin word Aurum.'),
('Chemistry', 'Periodic Table', 'How many elements are in the periodic table?', '108', '116', '118', '120', 'C', 'There are 118 confirmed elements in the periodic table.'),
('Chemistry', 'Atoms', 'What is the charge of a proton?', 'Negative', 'Neutral', 'Positive', 'Variable', 'C', 'Protons carry a positive charge.'),
('Chemistry', 'Atoms', 'What particles are found in the nucleus of an atom?', 'Protons and Electrons', 'Electrons and Neutrons', 'Protons and Neutrons', 'Only Protons', 'C', 'The nucleus contains protons and neutrons.');

INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('Physics', 'Motion', 'What is the unit of force?', 'Watt', 'Joule', 'Newton', 'Pascal', 'C', 'Force is measured in Newtons.'),
('Physics', 'Motion', 'What is the formula for speed?', 'Speed = Distance x Time', 'Speed = Distance / Time', 'Speed = Time / Distance', 'Speed = Force / Mass', 'B', 'Speed equals distance divided by time.'),
('Physics', 'Energy', 'What is the unit of energy?', 'Newton', 'Watt', 'Joule', 'Pascal', 'C', 'Energy is measured in Joules.'),
('Physics', 'Energy', 'What type of energy does a moving object have?', 'Potential energy', 'Thermal energy', 'Kinetic energy', 'Chemical energy', 'C', 'A moving object has kinetic energy.');


INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('English', 'Grammar', 'Which of these is a noun?', 'Run', 'Happy', 'Book', 'Quickly', 'C', 'A noun is a person, place or thing. Book is a thing.'),
('English', 'Grammar', 'What is the plural of "child"?', 'Childs', 'Childes', 'Children', 'Childrens', 'C', 'The irregular plural of child is children.'),
('English', 'Comprehension', 'What does the word "enormous" mean?', 'Tiny', 'Very large', 'Colorful', 'Dangerous', 'B', 'Enormous means very large or huge.');

INSERT INTO questions (subject, topic, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
('History', 'World War II', 'In what year did World War II end?', '1943', '1944', '1945', '1946', 'C', 'World War II ended in 1945.'),
('History', 'World War II', 'Which country did Germany invade to start World War II?', 'France', 'Poland', 'Russia', 'Britain', 'B', 'Germany invaded Poland on September 1 1939 starting World War II.'),
('History', 'Africa', 'What was the name of the policy of racial segregation in South Africa?', 'Colonialism', 'Apartheid', 'Slavery', 'Nationalism', 'B', 'Apartheid was the system of racial segregation in South Africa from 1948 to 1994.');


