import React, { useState } from 'react';


function FunctionalComponentWithState(props) {
  
    
    //Here we are using State Hook. 
    //The code here uses array destructuring
    const [count, setClickCount] = useState(0);
    const [even, setEvenNumber] = useState(0);
                                
    /*const evenNumFun = useState(0);
    const even = evenNumFun[0];
    const setEvenNumber = evenNumFun[1];
    */
   

    return (
    <div>
        <p>You clicked the button {count} times</p>
        <p>Next even number : {even} </p>
      <button onClick={() => { 
          setClickCount(count+1);
          setEvenNumber(even+2);
                      } }>
        Click me
      </button>
    </div>
  );
}

export default FunctionalComponentWithState;