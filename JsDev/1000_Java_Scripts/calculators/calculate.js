function load()
{
window.status = "Made by Ville Leivo 15.07.2002"
}

function count()
{
var item1price = 100;
var item2price = 100;
var item3price = 100;
var item4price = 100;
 
 // kortti
 if (calc.item1.checked){
   var witem1 = document.calc.item1.value = item1price;
 } else {
   var witem1 = document.calc.item1.value = 0;
 }

 if (calc.item2.checked){
   var witem2 = document.calc.item2.value = item2price;
 } else {
   var witem2 = document.calc.item2.value = 0;
 }

 // www-sivut
 if (calc.item3.checked) {
   var witem3 = document.calc.item3.value = item3price;
 } else {
   var witem3 = document.calc.item3.value = 0;
 }
 if (calc.item4.checked) {
   var witem4 = document.calc.item4.value = item4price;
 } else {
   var witem4 = document.calc.item4.value = 0;
 }
 document.calc.pay.value = witem1 + witem2 + witem3 + witem4;
}