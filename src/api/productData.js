import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL PRODUCTS
const getAllProducts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/products.json`, {
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

// GET SINGLE PRODUCT
const getSingleProduct = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/products/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllProducts, getSingleProduct };
