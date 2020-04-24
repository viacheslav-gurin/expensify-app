import moment from 'moment';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASURMENT_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// // child_remove
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
//     }
// );

// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
        
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         });
//         console.log(expenses);
//     });

// database.ref('expenses').push({
//     description: 'Gum',
//     note: 'Stimorol',
//     amount: 195,
//     createdAt: moment(0).valueOf()
// });
// database.ref('expenses').push({
//     description: 'Rent',
//     note: 'ooh, damn expensive',
//     amount: 109500,
//     createdAt: moment(0).subtract(4, 'days').valueOf()
// });
// database.ref('expenses').push({
//     description: 'Credit Card',
//     note: 'ok',
//     amount: 4500,
//     createdAt: moment(0).add(4, 'days').valueOf()
// });

// database.ref().on('value', (snapshot) => {
//     const obj = snapshot.val();
//     console.log(`${obj.name} is a ${obj.job.title} at ${obj.job.company}`);
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val(), (e) => {
//         console.log('Error with data fetching', e);
//     })
// });

// setTimeout(() => {
//     database.ref('age').set('39')
// }, 3500);
// setTimeout(() => {
//     database.ref().off(onValueChange)
// }, 7000);
// setTimeout(() => {
//     database.ref('age').set('40')
// }, 10500);

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e);
//     });



// database.ref().update({    
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

// database.ref().remove().then(() => {
//     console.log('Data removed!');
// }).catch((e) => {
//     console.log('Data has not been removed', e);
// });