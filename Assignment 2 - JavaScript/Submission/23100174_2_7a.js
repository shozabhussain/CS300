const {pbkdf2,} = require('crypto');

const start = Date.now() ;

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('1: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('2: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('3: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('4: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('5: ', Date.now() - start) ;
});

/*
The output times show that the first four calls to the function pbkdf2 were handled simultaneously
(around 1400miliseconds) while the fifth one was handled after them (around 2800milliseconds). This indicates that
node is multi-threaded. But what actually happens is that node is single threaded with an event loop that handles
and determines what the thread should be exectuting at any given time. However, the output indicates multi-threading.
It happens because of a library called libuv which does expensive task such as the function pbkdf2 ouside the event
loop and in a threadpool with four default worker threads. And that is why the first four calls ran simultaneously
while the fifth one didn't.
*/


