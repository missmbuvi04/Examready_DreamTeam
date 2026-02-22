const questions = [
  {
    id: 1,
    subject: "Mathematics",
    text: "If a triangle has sides of length 3, 4, and 5 units, what is the area of the triangle?",
    options: ["6 sq units", "7.5 sq units", "10 sq units", "12 sq units"],
    correct: 0,
    explanation:
      "Using the formula for a right triangle (since 3²+4²=5²), Area = ½ × base × height = ½ × 3 × 4 = 6 square units.",
  },
  {
    id: 2,
    subject: "Mathematics",
    text: "What is the value of x in the equation: 2x + 7 = 19?",
    options: ["x = 4", "x = 5", "x = 6", "x = 13"],
    correct: 2,
    explanation: "2x + 7 = 19 → 2x = 12 → x = 6.",
  },
  {
    id: 3,
    subject: "Biology",
    text: "Which organelle is responsible for producing energy (ATP) in a cell?",
    options: ["Ribosome", "Nucleus", "Mitochondria", "Golgi Apparatus"],
    correct: 2,
    explanation:
      "Mitochondria are known as the 'powerhouse of the cell' because they produce ATP through cellular respiration.",
  },
  {
    id: 4,
    subject: "Biology",
    text: "During photosynthesis, plants convert carbon dioxide and water into glucose using which energy source?",
    options: ["Thermal energy", "Chemical energy", "Sunlight", "Wind energy"],
    correct: 2,
    explanation:
      "Photosynthesis uses sunlight (solar energy) to convert CO₂ and H₂O into glucose and oxygen.",
  },
  {
    id: 5,
    subject: "Chemistry",
    text: "What is the chemical formula for water?",
    options: ["HO₂", "H₂O", "H₂O₂", "OH"],
    correct: 1,
    explanation:
      "Water is composed of two hydrogen atoms and one oxygen atom, giving it the formula H₂O.",
  },
];

export default questions;
