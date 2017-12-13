new Promise(function(resolve, reject) {
    
      setTimeout(() => resolve(1), 1000); // (*)
    
    }).then(function(result) { // (**)
    
      alert(result); // 1
      console.log( result * 2 );
    
    });