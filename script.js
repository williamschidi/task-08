' use strict';

const readline = require('readline');

class Telephone {
  constructor() {
    this.phoneNumbers = [];
    this.observers = [];
  }

  addPhoneNumber(phoneNumber) {
    this.phoneNumbers.push(phoneNumber);
    console.log('Phone number added:', phoneNumber);
  }

  removePhoneNumber(phoneNumber) {
    const index = this.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.phoneNumbers.splice(index, 1);
      console.log('Phone number removed:', phoneNumber);
    } else {
      console.log('Phone number not found:', phoneNumber);
    }
  }

  dialPhoneNumber(phoneNumber) {
    if (this.phoneNumbers.includes(phoneNumber)) {
      this.notifyObservers(phoneNumber);
    } else {
      console.log('Error: Phone number not found.');
    }
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(phoneNumber) {
    this.observers.forEach((observer) => observer.update(phoneNumber));
  }
}

class Observer {
  update(phoneNumber) {}
}

class PrintPhoneNumberObserver extends Observer {
  update(phoneNumber) {
    console.log('Dialed phone number:', phoneNumber);
  }
}

class NowDialingObserver extends Observer {
  update(phoneNumber) {
    console.log('Now Dialling', phoneNumber);
  }
}

function startCLI() {
  const telephone = new Telephone();
  const printObserver = new PrintPhoneNumberObserver();
  const dialingObserver = new NowDialingObserver();
  telephone.addObserver(printObserver);
  telephone.addObserver(dialingObserver);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    'Welcome to the Telephone Package, press 1 to add a Phone Number, 2 to dial added Phone Number, 3 to delete Phone Number'
  );

  rl.on('line', (input) => {
    switch (input.trim()) {
      case '1':
        rl.question('Enter phone number to add: ', (phoneNumber) => {
          telephone.addPhoneNumber(phoneNumber);
        });
        break;
      case '2':
        rl.question('Enter phone number to dial: ', (phoneNumber) => {
          telephone.dialPhoneNumber(phoneNumber);
        });
        break;
      case '3':
        rl.question('Enter phone number to remove: ', (phoneNumber) => {
          telephone.removePhoneNumber(phoneNumber);
        });
        break;
      default:
        console.log('Invalid input. Please enter 1, 2, or 3.');
    }
  });
}

startCLI();
