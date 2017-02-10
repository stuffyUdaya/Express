module.exports = function (){
  return {
    add: function(num1, num2) {

        console.log (num1+num2);
         // add code here
    },
    multiply: function(num1, num2) {

        console.log( num1*num2)
         // add code here
    },
    square: function(num) {

          console.log( num*num )
          // add code here
    },
    random: function(num1, num2) {
         // add code here
         x= Math.floor(Math.random() * (num2 - num1)) + num1;
         console.log(x);
    }
  }
};
