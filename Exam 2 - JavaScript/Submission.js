function reverseArrayInPlace (array) {
    let bottom = 0 ;
    let top = array.length - 1 ;

    for(let i=0 ; i<(array.length/2); i++)
    {
        if((array.length%2) != 0 && i > array.length/2)
        {
            break ;
        }
        let temp = array[i] ;
        array[bottom] = array[top] ;
        array[top] = temp;
        bottom ++ ;
        top -- ; 
    }
    return;
}
// let arr = [] ;
//reverseArrayInPlace(arr) ;
// console.log(arr) ;
//console.log(reverseArrayInPlace("")) ;

function loopFunction( value, testFunction, bodyFunction, updateFunction) {
    while(1)
    {
        if(testFunction(value) == false)
        {
            return ;
        }
        else
        {
            bodyFunction(value) ;
            value = updateFunction(value) ;
        }
    }
} 

//let value = 1 ;
//loopFunction(2, (i) => i <= 3 , (i) => console.log(i), (i) => i + 1 ); 

function allPromise (array) {

    let myList = [] ;
    let errorList = [] ;
    let counter = 0 ;
    return new Promise((resolve, reject) => {
        if(array.length == 0)
        {
            reject("Error: Array is empty");
        }
        for(let i =0 ; i<array.length; i++)
        {
            array[i].then((results) => {
                myList[i] = results ;
                counter++ ;
                if(counter == array.length)
                {
                    resolve(myList) ;
                }
            }, (error) => {reject(error)} ) ;
        }
    }) ;
}

// let p1 = new Promise((resolve, reject)  => {
//     setTimeout(() => {
//         resolve("This is p1") ;
//     }, 5000) ;
    
// }) ;

// let p2 = new Promise((resolve, reject)  => {
//     setTimeout(() => {
//         resolve("this is p2") ;
//     }, 1000) ;
    
// }) ;

// let p3 = new Promise((resolve, reject)  => {
//     setTimeout(() => {
//         resolve("this is p3") ;
//     }, 100) ;
// }) ;

//allPromise([p1, p2]).then((results) => {console.log(results)}).catch((error) => {console.log(error)}) ;
//Promise.all([p1, p2, p3]).then((results) => {console.log(results)}).catch((error) => {console.log(error)}) ;
//allPromise([]).then((results) => {console.log(results)}, (err) => {console.log(err)}) ;

const checkDigit = (x) => {
    let digits = ['0','1','2','3','4','5','6','7','8','9'] ;
    for(let i =0; i<digits.length; i++)
    {
        if(x == digits[i])
        {
            return true ;
        }
    }
    return false; 
}

function isIdentifier (ident) {
    
    if(checkDigit(ident[0]) || ident[ident.length-1] == '_')
    {
        return false ;
    }
    else{
        for(let i=0; i<ident.length; i++)
        {
            if(i == ident.length -1)
            {
                return true ;
            }
            if(ident[i] == '$' && (ident[i+1] == '$' || ident[i+1] == '_'))
            {
                return false ;
            }
            if(ident[i] == '_' && ident[i+1] == '$')
            {
                return false ;
            }
        }
    }
} 

//console.log(isIdentifier("h6hello_")) ;
