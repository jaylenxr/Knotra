import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL HAIRTYPES
const getAllHairtypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/hairtype.json`, {
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

// GET SINGLE HAIRTYPE
const getSingleHairtype = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/hairtype/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllHairtypes, getSingleHairtype };
