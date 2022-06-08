const fs = require('fs');
const readline = require('readline');
const lineReader = require('line-reader');
const prompt = require('prompt-sync')() ;
// // ////////////////////////////////////////////////////// Question 1////////////////////////////////////////////
// Syntax for taking the input from user taken from here https://github.com/nickewing/line-reader

function returnNumber (exp) {
  if(exp.includes("'"))
  {
    return exp.split("'")[1] ;
  }
  else
  {
    let x = exp.split(")") ;
    return x[0].split("(")[1];
  }
}

function returnMinimum(bottom, top, list){
  let min = 9999;
  for(let i=bottom; i<=top; i++)
  {
    if(list[i] < min)
    {
      min = list[i]
    }
  }

  return min ;
}

function returnMaximum(bottom, top, list){
  let max = -9999;
  for(let i=bottom; i<=top; i++)
  {
    if(list[i] > max)
    {
      max = list[i]
    }
  }

  return max ;
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

let lastOp = "" ;
let result = "" ;
let linesToRead = 0 ;
let topPointer = -1 ;
let bottomPointer = 0 ;
let list = [];
let stackCheck = 0 ;
let queueCheck = 0 ;
let minQueueCheck = 0 ;
let maxQueueCheck = 0 ;
let minQueue = [] ;
let maxQueue = [] ;

function PredictDataStructure() {
// rl.question('Enter the file name: ', (fileName) => {
//   rl.close() ;

  let fileName = prompt('Enter the file name: ')
  lineReader.eachLine(fileName, (line, last) => {

    if(line == "")
    {
      if(linesToRead != 0 && lastOp == "push")
      {
        result = "Insufficient Information" ;
      }
      if(result == "")
      {
        if(stackCheck!=1 && queueCheck!=1 && minQueueCheck!=1 && maxQueueCheck!=1)
        {
          result = "Insufficient Information" ;
        }
        else
        {
          if(stackCheck == 1){result = result + "Stack, "} ;
          if(queueCheck == 1){result = result + "Queue, "} ;
          if(minQueueCheck == 1){result = result + "Min Priority Queue, "} ;
          if(maxQueueCheck == 1){result = result + "Max Priority Queue"} ;
        }
      }
      console.log(result) ;
      topPointer = -1 ;
      bottomPointer = 0 ;
      result = "" ;
      list = [] ;
      stackCheck = 0 ;
      queueCheck = 0 ;
      minQueueCheck = 0 ;
      maxQueueCheck = 0 ;
      minQueue = [];
      maxQueue = [];
      lastOp = "" ;
    }
    else if(line[0] != "p" && line != "")
    {
      linesToRead = line ;
      console.log(linesToRead) ;
    }
    else if(line.substring(0,3) == "pop")
    {
      lastOp = "pop" ;
      if(list.length == 0)
      {
        result = "Illegal Command" ;
      }

      if((list[topPointer] == returnNumber(line) || returnNumber(line).charCodeAt(0) == list[topPointer]) && stackCheck !=-1)
      {
        topPointer -- ;
        stackCheck = 1 ;
      }
      else
      {
        stackCheck = -1 ;
      }

      if((list[bottomPointer] == returnNumber(line) || returnNumber(line).charCodeAt(0) == list[bottomPointer]) && queueCheck !=-1)
      {
        bottomPointer++ ;
        queueCheck = 1 ;
      }
      else
      {
        queueCheck = -1 ;
      }

      let min = minQueue.shift() ;
      if(( min == returnNumber(line) || returnNumber(line).charCodeAt(0) == min) && minQueueCheck!= -1)
      {
        minQueueCheck = 1 ;
      }
      else
      {
        minQueueCheck = -1 ;
      }

      let max = maxQueue.pop();
      if((max == returnNumber(line) || returnNumber(line).charCodeAt(0) == max) && maxQueueCheck!= -1)
      {
        maxQueueCheck = 1 ;
      }
      else
      {
        maxQueueCheck = -1 ;
      }

      console.log(line) ;
      linesToRead -- ;
    }
    else if(line.substring(0,4) == "push")
    {
      lastOp = "push" ;
      if(line.includes("'"))
      {
        list.push(returnNumber(line).charCodeAt(0)) ;
        minQueue.push(returnNumber(line).charCodeAt(0)) ;
        maxQueue.push(returnNumber(line).charCodeAt(0)) ;
      }
      else
      {
        list.push(returnNumber(line)) ;
        minQueue.push(returnNumber(line)) ;
        maxQueue.push(returnNumber(line)) ;
      }
      minQueue.sort() ;
      maxQueue.sort() ;
      topPointer++ ;
      console.log(line) ;
      linesToRead -- ;
    }

    if(last)
    {
      if(linesToRead != 0 && lastOp == "push" )
      {
        result = "Insufficient Information" ;
      }
      if(result == "")
      {
        if(stackCheck!=1 && queueCheck!=1 && minQueueCheck!=1 && maxQueueCheck!=1)
        {
          result = "Insufficient Information" ;
        }
        else
        {
          if(stackCheck == 1){result = result + "Stack, "} ;
          if(queueCheck == 1){result = result + "Queue, "} ;
          if(minQueueCheck == 1){result = result + "Min Priority Queue, "} ;
          if(maxQueueCheck == 1){result = result + "Max Priority Queue"} ;
        }
      }
      console.log(result) ;
    }
  });
//});

}

//PredictDataStructure() ;

///////////////////////////////////////////////Question 2////////////////////////////////////////////////////////////

class Node {
  constructor(x)
  {
    this.data = x ;
    this.next = null ;
  }
}

let head = new Node('s') ;
let head1 = new Node('h') ;
let head2 = new Node('o') ;
let head3 = new Node('z') ;

head.next = head1 ;
head1.next = head2 ;
head2.next = head3 ;
head3.next = null ;

function checkpalindrome(head)
{
  if(head == null)
  {
    return true ;
  }
  let counter = 0 ;
  let list = [] ;
  let temp = head ;
  while(temp != null)
  {
    console.log(temp.data) ;
    list[counter] = temp.data ;
    counter++ ;
    temp = temp.next ;
  }

  let start = 0 ;
  let end = list.length-1 ;
  while(end !=start && end-start != 1)
  {
    if(list[start] != list[end])
    {
      return false ;
    }
    start++ ;
    end-- ;
  }

  return true ;
}

//console.log(checkpalindrome(head));

//////////////////////////////////////////////////Question 3 //////////////////////////////////////////////////

function rotate(n, head)
{
  let list = [] ;
  let temp = head ;
  let counter = 0 ;
  while(temp != null)
  {
    list[counter] = temp.data ;
    counter++ ;
    temp = temp.next ;
  }

  while(n!=0)
  {
    let templist = [] ;
    templist[0] = list[list.length-1] ;
    for(let i=1; i<list.length; i++)
    {
      templist[i] = list[i-1] ;
    }
    list = templist ;
    n-- ;
  }

  temp = head ;
  counter = 0 ;
  while(temp != null)
  {
    temp.data = list[counter] ;
    temp = temp.next ;
    counter++
  }

  return head ;
}

// let hello = rotate(3,head) ;
// while(hello != null)
// {
//   console.log(hello.data);
//   hello = hello.next ;
// }

///////////////////////////////////////////////////Question4 ///////////////////////////////////////////////

function reverseHelper(elem, s)
{
  if(s.length > 0)
  {
    let toPushLater = s.pop() ;
    reverseHelper(elem, s) ;
    s.push(toPushLater) ;
    return ;
  }

  s.push(elem) ;
  return ;

}

function reverse(s)
{
  if(s.length == 0)
  {
    return ;
  }
  if(s.length == 1)
  {
    return ;
  }
  else
  {
    let elem = s.pop() ;
    reverse(s);
    reverseHelper(elem, s) ;
  }
}

//let stack = []
//reverse(stack);
//console.log(stack) ;

////////////////////////////////////////////////Question5////////////////////////////////////////////////////////////////

const axios = require('axios');

function getName(obj)
{
  let listOfPromises = [];
  while(obj.length != 0)
  {
    let pr = axios.get(obj.pop()) ;
    listOfPromises.push(pr) ;
  }
  return Promise.all(listOfPromises) ;
}

function StarWars() {
let entity = prompt("Enter Entity: ") ;
let Name = prompt("Enter Name: ") ;

axios.get('https://swapi.dev/api/').then( entityList => {

    //console.log(Object.keys(entityList.data)) ;
    if(Object.keys(entityList.data).includes(entity))
    {
      //console.log(entity) ;

      axios.get(`https://swapi.dev/api/${entity}/?search=${Name}`).then(async (resp) => {

        if(resp.data.count == 1 && (resp.data.results[0].name == Name || resp.data.results[0].title == Name))
        {
          //console.log(Name) ;
          results = resp.data.results[0] ;
          //console.log(results);
          for(key in results)
          {
            if(key == "opening_crawl" || key == "created" || key == "edited" || key == "url")
            {
              continue ;
            }
            else if(typeof(results[key]) != "object" )
            {
              if( typeof(results[key]) == "string" && results[key].substring(0,8) == "https://")
              {
                const values = await getName([results[key]]) ;
                console.log(`${key.toUpperCase()}: ${values[0].data.name}`) ;
              }
              else
              {
                console.log(`${key.toUpperCase()}: ${results[key]}`) ;
              }

            }
            else if(typeof(results[key]) == "object" && Object.keys(results[key]).length != 0)
            {
              console.log(`${key.toUpperCase()}: `) ;
              //console.log(results[key]) ;
              const values = await getName(results[key]) ;
              let counter = 1 ;
              while(values.length !=0)
              {
                let elem = values.pop() ;
                if(typeof(elem.data.name) == "undefined")
                {
                  console.log(`${counter}. ${elem.data.title}`) ;
                }
                else
                {
                  console.log(`${counter}. ${elem.data.name}`) ;
                }
                counter++ ;
              }
            }
          }
        }
        else
        {
          console.log("Wrong name/title entered") ;
        }
      }).catch((error) => {
        console.log(error.message) ;
      }) ;
    }
    else
    {
      console.log("Incorrect Entity") ;
    }

}).catch((error) => {
  console.log(error.message) ;
});
}

//StarWars();

/////////////////////////////////////////////////Question6 //////////////////////////////////////////////////////////////

function factorial(n)
{
  if(n == 1)
  {
    return 1 ;
  }
  else
  {
    return (n*factorial(n-1)) ;
  }
}

function nCk(n, k)
{
  return (factorial(n) / (factorial(k)*factorial(n-k)) ) ;
}

function performance(list, speed, effeciency)
{
  let sumSpeeds = 0 ;
  let efflist = [];
  while(list.length != 0)
  {
    let temp = list.pop()
    sumSpeeds = sumSpeeds + speed[temp-1] ;
    efflist.push(effeciency[temp-1]) ;
  }
  return (sumSpeeds*Math.min(...efflist)) ;
}

function MaxPerformance(k, n, speed, effeciency)
{
  let totalCombinations = nCk(n, k);
  let Combinations = [];
  let jump = 1 ;
  let index = 0 ;
  while(totalCombinations != 0)
  {
    for(let j=0; j<n; j++)
    {
      let temp = [];
      let count = j ;
      for(let i=0; i<k; i++)
      {
        if( (count+1)>n )
        {
          temp.push( (count+1)%n) ;
        }
        else
        {
          temp.push(count+1) ;
        }
        count = count + jump;
      }
      Combinations.push(temp) ;
      //console.log(temp) ;
      totalCombinations= totalCombinations - 1 ;
      if(totalCombinations == 0)
      {
        break ;
      }
    }
    jump++ ;
  }

  let performanceList = []
  while(Combinations.length != 0 )
  {
    performanceList.push(performance(Combinations.pop(), speed, effeciency)) ;
  }

  return (Math.max(...performanceList)) ;
}

//console.log(MaxPerformance(2, 5, [10, 40, 30, 20, 50],[50, 20, 30, 40, 10]));

/////////////////////////////////////////////Question8///////////////////////////////////////////////////////

const readStreamPromise = (dir) => {

  return new Promise((resolve, reject) => {
    resolve(fs.createReadStream(dir)) ;
  });
}

const writeStreamPromise = (dir) => {

  return new Promise((resolve, reject) => {
    resolve(fs.createWriteStream(dir))
  });
}

const  zlib = require('zlib');
// const { resolve } = require('path');
// const { deflate, unzip } = require('zlib');

function compress(sourceDir, TargetDir)
{
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log(err);
    }

    //console.log(files) ;

    files.forEach((filename) => {

      fs.stat(`${sourceDir}\\${filename}`, (error, stats) => {
        if (error) {
          console.log(error);
        }
        else {
          //console.log("Path is directory:", stats.isDirectory());
          if(stats.isDirectory())
          {
            fs.mkdir(`${TargetDir}\\${filename}`, (err) => {
              if (err) {
                return console.error(err);
              }
              //console.log('Directory created successfully!');
              compress(`${sourceDir}\\${filename}`,`${TargetDir}\\${filename}`) ;
            });
          }
          else
          {
            const gzip = zlib.createGzip();
            //const read = fs.createReadStream(`${sourceDir}\\${filename}`);
            //const write = fs.createWriteStream(`${TargetDir}\\${filename}`);
            readStreamPromise(`${sourceDir}\\${filename}`).then((read) => {
              writeStreamPromise(`${TargetDir}\\${filename}.gz`).then((write) => {
                read.pipe(gzip).pipe(write);
              }, (error) => {console.log(error)})
            }, (error) => {console.log(error)}) ;
          }
        }
      });
    });
  });
}

//compress("D:\\Spring 2022\\Advanced Programming\\node_modules","D:\\Spring 2022\\Advanced Programming\\Assignment 2\\destination")
//compress('source','destination') ;