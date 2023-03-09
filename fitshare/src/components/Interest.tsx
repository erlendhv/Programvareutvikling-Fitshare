import { useState } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

interface User {
  uid: string;
}

interface Props {
  user: User;
}

const Interest = ({ user }: Props) => {
  const [selectedInterest, setSelectedInterest] = useState<string>('');

  const handleInterestSelect = (interest: string) => {
    setSelectedInterest(interest);
  }

  const handleSaveInterest = () => {
    const db = firebase.firestore();
    const userDocRef = db.collection('users').doc(user.uid);
    let interestValue: number;
    switch (selectedInterest) {
      case 'Building strength':
        interestValue = 1;
        break;
      case 'Building size':
        interestValue = 2;
        break;
      case 'Stamina':
        interestValue = 3;
        break;
      default:
        interestValue = 0;
        break;
    }
    userDocRef.set({ interest: interestValue }, { merge: true });
  }

  return (
    <div>
      <h2>What is your primary fitness interest?</h2>
      <div>
        <input
          type="radio"
          id="building-strength"
          name="interest"
          value="Building strength"
          checked={selectedInterest === 'Building strength'}
          onChange={() => handleInterestSelect('Building strength')}
        />
        <label htmlFor="building-strength">Building strength</label>
      </div>
      <div>
        <input
          type="radio"
          id="building-size"
          name="interest"
          value="Building size"
          checked={selectedInterest === 'Building size'}
          onChange={() => handleInterestSelect('Building size')}
        />
        <label htmlFor="building-size">Building size</label>
      </div>
      <div>
        <input
          type="radio"
          id="stamina"
          name="interest"
          value="Stamina"
          checked={selectedInterest === 'Stamina'}
          onChange={() => handleInterestSelect('Stamina')}
        />
        <label htmlFor="stamina">Stamina</label>
      </div>
      <button onClick={handleSaveInterest}>Save interest</button>
    </div>
  );
}

export default Interest;