import * as SQLite from 'expo-sqlite';
import { Dustbin } from '../models/Dustbin';

const database = SQLite.openDatabase('diy.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS dustbins (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          distance REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertDustbin(dustbin) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO dustbins (title, imageUri, address, lat, lng, distance) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          dustbin.title,
          dustbin.imageUri,
          "JC Bose Annexe, IIT Kharagpur",
          dustbin.location.lat,
          dustbin.location.lng,
          100
        ],
        (_, result) => {
          console.log(JSON.stringify(result));
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  })

  return promise;
}

export function fetchDustbins() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dustbins ORDER BY distance ASC`,
        [],
        (_, result) => {
          console.log(JSON.stringify(result));
          const dustbins = [];
          for (const dp of result.rows._array) {
            dustbins.push(
              new Dustbin(
                dp.title,
                dp.imageUri,
                { address: dp.address, lat: dp.lat, lng: dp.lng },
                dp.id
              )
            );
          };
          resolve(dustbins);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });

  return promise;
};

export function fetchDustbinDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM dustbins WHERE id = ?',
        [id],
        (_, result) => {
          const dbDustbin = result.rows._array[0];
          const dustbin = new Dustbin(
            dbDustbin.title,
            dbDustbin.imageUri,
            { address: dbDustbin.address, lat: dbDustbin.lat, lng: dbDustbin.lng },
            dbDustbin.id
          );
          resolve(dustbin);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });

  return promise;
}

export function deleteDustbin(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM dustbins WHERE id = ?',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });

  return promise;
}

const updateDistance = (id, distance) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE dustbins SET distance = ? WHERE id = ?',
        [distance, id],
        (_, result) => {
          console.log(JSON.stringify(result));
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  });

  return promise;
}


export function orderDustbinsByDistance(userLat, userLng) {
  console.log('entered orderDustbinsByDistance');
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dustbins`,
        [],
        (_, result) => {
          console.log(JSON.stringify(result));
          let dustbins = [];
          for (const dp of result.rows._array) {
            dustbins.push({
              "lat": dp.lat,
              "lng": dp.lng,
              "id": dp.id,
            })
          }
          console.log(dustbins);
          for (const dp of dustbins) {
            updateDistance(
              dp.id,
              6371 * Math.acos(Math.sin(dp.lat) * Math.sin(userLat) + Math.cos(dp.lat) * Math.cos(userLat) * Math.cos(dp.lng - userLng))
            );
          }
          resolve(dustbins);
        },
        (_, error) => {
          reject(error);
        })
    });
    // database.transaction((tx) => {
    //   tx.executeSql(

  })

  return promise;
}