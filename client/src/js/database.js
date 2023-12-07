// Importing openDB function from the idb library for IndexedDB operations.
import { openDB } from 'idb';

// Function to initialize the database.
const initdb = async () => {
  // Open the 'jate' database with version 1.
  openDB('jate', 1, {
    // Upgrade callback is called when the database version changes.
    upgrade(db) {
      // Check if the 'jate' object store already exists.
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // If the object store doesn't exist, create it with auto-incrementing keys.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => {
  console.error('putDb not implemented');

  // Create a connection to the 'jate' database with version 1.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction with read-write privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the 'jate' object store within the transaction.
  const store = tx.objectStore('jate');

  // Use the .put() method to add or update data in the database.
  // The text editor consists of one field of information that is repeatedly retrieved and updated.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.error('getDb not implemented');

  // Create a connection to the 'jate' database with version 1.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction with read-only privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the 'jate' object store within the transaction.
  const store = tx.objectStore('jate');

  // Use the .get() method to retrieve the text editor entry from the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;

  // If there is a text editor entry, log and return it; otherwise, log a message.
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

// Call the initdb function to initialize the 'jate' database.
initdb();
