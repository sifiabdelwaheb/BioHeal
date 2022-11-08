/***
 * Stepper Data
 */
export const steps = [
  "add your gendre and age",
  "add your name and location",
  "add your country",
];

/***
 * Form Data
 */
export const countryOptions = [
  { value: 1, label: "US" },
  { value: 2, label: "China" },
  { value: 3, label: "Canada" },
];

export const capitalOptions = {
  US: [
    { value: 1, label: "New York" },
    { value: 2, label: "Washington DC" },
    { value: 3, label: "Boston" },
    { value: 4, label: "Salt Lake City" },
  ],
  China: [
    { value: 1, label: "Nanjing" },
    { value: 2, label: "Shanghai" },
    { value: 3, label: "Beijing" },
    { value: 4, label: "Chengdu" },
  ],
  Canada: [
    { value: 1, label: "Winnipeg" },
    { value: 2, label: "Montreal" },
    { value: 3, label: "Ottowa" },
    { value: 4, label: "Wawa – Ontario" },
  ],
};

/***
 * Solutions
 */
export const countryToCapital = [
  { country: 1, capital: 2 },
  { country: 2, capital: 3 },
  { country: 3, capital: 3 },
];

export const countryQuiz = {
  citizens: 2, // citizens
  surface: 3, // surface
  languages: 2, // languages
};

export const citiesQuiz = {
  citizens: 1, // citizens
  age: 1, // age
};
