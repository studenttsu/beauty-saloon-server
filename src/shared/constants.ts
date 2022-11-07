export const ENV = process.env.NODE_ENV || 'dev';
export const PORT = process.env.PORT || 3001;
export const API_PREFIX = 'api';

const server = {
  dev: `http://localhost:${PORT}`,
  staging: 'https://beaty-saloon-api.herokuapp.com/',
  production: 'https://beaty-saloon-api.herokuapp.com/',
};

export const JWT_ACCESS_TOKEN_SECRET = '0edf201b-89b0-4ffa-b079-8674b2ca39cf';
export const JWT_REFRESH_TOKEN_SECRET = '0612922-b505-4613-bec6-92732b6d3600';
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = 1800000;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = 2592000000;

export const API_PATH = `${server[ENV]}/${API_PREFIX}`;

export const FIREBASE_STORAGE_HOST = 'https://firebasestorage.googleapis.com';
export const FIREBASE_STORAGE_BUCKET = 'gs://beautyserver-f04c1.appspot.com';
export const FIREBASE_STOREAGE_KEYFILE = 'beautyserver-f04c1-firebase-adminsdk-scb1f-a60607ac9a.json';
