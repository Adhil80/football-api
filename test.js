const jsObjects = [
    {a: 1, b: 2}, 
    {a: 3, b: 4}, 
    {a: 5, b: 6}, 
    {a: 7, b: 8}
  ]
  
  let result = jsObjects.filter(obj => {
    return obj.b === 21
  })
  
  console.log(result)