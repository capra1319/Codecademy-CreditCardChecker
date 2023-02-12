// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

//----------Add your functions below:

//Function validating the credentials of the credit cards.
function validateCred(card) {
  // Is the card valid boolean status
  let validStatus = false;
  //Array for holding card numbers when applying the luhn formula
  let moduloArray = [];
  // The sum value of a number used at the end of the luhn forumla
  let moduloSum = 0;
  //Boolean Status used to track which number require to be doubled, during the calculation.
  let dN = false;
  //apply step 1 of luhn's formula to each number
  for (let num = card.length - 1; num >= 0; num--) {
    let luhnNum = card[num];
    if (dN === true) {
      luhnNum = card[num] * 2;
    }
    // Is it Double Number?
    // console.log(`LOG: double? ${dN}, number index[${num}] "${luhnNum}"`);
    if (luhnNum > 9) {
      luhnNum = luhnNum - 9;
    }
    moduloArray.push(luhnNum);

    // Toggle the Double Number Mode
    if (dN === true) {
      dN = false;
    } else {
      dN = true;
    }
  }

  // moduloArray result
  // console.log("LOG: Credit Card Numbers " + moduloArray);
  moduloArray.forEach((number) => (moduloSum += number));
  // Log the Array of all number
  // console.log("LOG: Sum of all numbers " + moduloSum);
  // Is this a valid card? if so, result should be 0
  moduloSum = moduloSum % 10;
  // console.log("Remainder of 10 is " + moduloSum);
  if (moduloSum === 0) {
    validStatus = true;
  }
  return validStatus;
}

// Find all Invalid Credit Cards
function findInvalidCards(array01) {
  let invalidCards = [];
  array01.forEach((singleCard) => {
    // console.log(singleCard);
    const isValid = validateCred(singleCard);
    if (isValid === false) {
      invalidCards.push(singleCard);
    } else return;
  });
  return invalidCards;
}

let invalidCards = findInvalidCards(batch);

// Find the companies of all Invalid Credit Cards
function idInvalidCardCompanies(invalidCards) {
  let cardCompanies = [];
  invalidCards.forEach((card) => {
    const firstNumber = card[0];
    if (firstNumber == 3) {
      // Amex (American Express)
      if (cardCompanies.includes("Amex (American Express)") !== true) {
        cardCompanies.push("Amex (American Express)");
      } else return;
    } else if (firstNumber == 4) {
      // Visa
      if (cardCompanies.includes("Visa") !== true) {
        cardCompanies.push("Visa");
      } else return;
    } else if (firstNumber == 5) {
      // Mastercard
      if (cardCompanies.includes("Mastercard") !== true) {
        cardCompanies.push("Mastercard");
      } else return;
    } else if (firstNumber == 6) {
      // Discover
      if (cardCompanies.includes("Discover") !== true) {
        cardCompanies.push("Discover");
      } else return;
    } else {
      cardCompanies.push("Company not found");
    }
  });
  return cardCompanies;
}

console.log(`List of invalid cards
${findInvalidCards(batch)}
`);
console.log(`
List of companies that sent invalid cards
${idInvalidCardCompanies(batch)}`);
