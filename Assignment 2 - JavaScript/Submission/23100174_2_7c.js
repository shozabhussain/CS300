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

/*
1 call: 831 milliseconds
2 calls: (889+892)/2 = 890.5 milliseconds
3 calls: (920+933+945)/3 = 932.7 milliseconds
4 calls: (1101+1174+1181+1238)/4 = 1173.5 milliseconds
5 calls: (1223+1274+1289+1301+1342)/5 = 1285.8 milliseconds

Although the number of default threads has been increased, the average time running time keep increasing because as
the number of function calls increases, the cpu has to do more work in parallel now, which might decrease the cpu speed
and result in greater division of cpu resources. Hence, cpu performance decreases and it takes more time as the number
of function calls increases.
*/