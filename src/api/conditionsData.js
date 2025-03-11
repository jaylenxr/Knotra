import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET CONDITIONS
const getAllConditions = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/conditions.json`, {
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

// UPDATE CONDITION
const updateCondition = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/conditions/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
export { getAllConditions, updateCondition };
