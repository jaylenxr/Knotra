import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL LOGS
const getAllLogs = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json`, {
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

// GET ALL LOGS BY UID
const getLogsByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json?orderBy="uid"&equalTo="${uid}"`, {
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

// GET SINGLE LOG
const getSingleLog = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE LOG
const createLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE LOG
const updateLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE LOG
const deleteSingleLog = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET ALL PUBLIC LOGS
const getPublicLogs = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json?orderBy="public"&equalTo=true`, {
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

// GET PUBLIC LOG BY USER
const getUserPublicLogs = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const publicLog = Object.values(data).filter((obj) => obj.public);
          resolve(publicLog);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FILTER FAVORITE LOGS
const favoriteLogs = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/logs.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const favLogs = Object.values(data).filter((obj) => obj.favorite);
          resolve(favLogs);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { getAllLogs, getLogsByUid, createLog, getSingleLog, deleteSingleLog, updateLog, getPublicLogs, getUserPublicLogs, favoriteLogs };
