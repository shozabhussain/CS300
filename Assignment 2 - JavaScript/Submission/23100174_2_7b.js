process.env.UV_THREADPOOL_SIZE = 8
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

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('6: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('7: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('8: ', Date.now() - start) ;
});

pbkdf2('secret', 'salt', 1000000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    console.log('9: ', Date.now() - start) ;
});

/*
The output times show that the first 8 calls to the function pbkdf2 were handled simultaneously
(around 2600 miliseconds) while the ninth one was handled after them (around 3400 milliseconds). So this indicates that
there are now 8 worker threads in threadpool. Although the individual time for a single call also increased which
indicates that the time increases as the number of threads increases, probably due to more number of threads so
more parallel computation.
*/