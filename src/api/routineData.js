import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL ROUTINES
const getAllRoutines = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routines.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// GET SINGLE ROUTINE
const getSingleRoutine = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routines/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllRoutines, getSingleRoutine };
