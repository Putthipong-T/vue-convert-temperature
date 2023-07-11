const { myQuery } = require('./read.js');

myQuery().then(result => {
  console.log(result.time);
  console.log(result.tempValue);
}).catch(error => {
  console.error(error);
});
