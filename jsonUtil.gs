var delimetr=function(){return "|"}
var configJSON=function(){
  var cnf1={};
 cnf1.ss=SpreadsheetApp.getActiveSpreadsheet();//Spreadsheet
 cnf1.sheet=cnf1.ss.getActiveSheet();//Sheet
 cnf1.rangeRow=cnf1.sheet.getRange("A1:D1").getValues()[0];//[]
 cnf1.rangeCol=cnf1.sheet.getRange("B1:D1").getValues()[0];//[]
 cnf1.rangeData=cnf1.sheet.getRange("A1:D7").getValues();//[][]
 cnf1.headers=cnf1.rangeData.shift();//[]
  
  return cnf1//object
}



//var json = '[{"Day":"Nov 03","Saavor Kitchen":null,"Home Kitchen":2,"Restaurant":null},{"Day":"Nov 06","Saavor Kitchen":null,"Home Kitchen":1,"Restaurant":1},{"Day":"Nov 07","Saavor Kitchen":null,"Home Kitchen":null,"Restaurant":1},{"Day":"Nov 08","Saavor Kitchen":null,"Home Kitchen":2,"Restaurant":null},{"Day":"Nov 09","Saavor Kitchen":null,"Home Kitchen":4,"Restaurant":null},{"Day":"Nov 10","Saavor Kitchen":null,"Home Kitchen":3,"Restaurant":null},{"Day":"Nov 11","Saavor Kitchen":null,"Home Kitchen":4,"Restaurant":null},{"Day":"Nov 13","Saavor Kitchen":null,"Home Kitchen":4,"Restaurant":1},{"Day":"Nov 14","Saavor Kitchen":null,"Home Kitchen":2,"Restaurant":1},{"Day":"Nov 15","Saavor Kitchen":null,"Home Kitchen":5,"Restaurant":null},{"Day":"Nov 16","Saavor Kitchen":null,"Home Kitchen":5,"Restaurant":null},{"Day":"Oct 30","Saavor Kitchen":null,"Home Kitchen":null,"Restaurant":2},{"Day":"Oct 31","Saavor Kitchen":null,"Home Kitchen":2,"Restaurant":3}]';

var columns = [ 'Parametrs', 'id option'];


function JsonToArray(){
  //Logger.log(JSON.stringify(configPollsParamers()))
 // 
  var cnf=configPollsParamers(); 
  Logger.log(JSON.stringify(getTableToObj(cnf)))
  var json=JSON.stringify(lens("Тестовый опрос").get(getTableToObj(cnf)))
  Logger.log(json)
  var result = JSON.parse(json).map(function(obj) {
  return columns.map(function(key) {
    return obj[key];
  });
});
result.unshift(columns);
Logger.log(result);
Logger.log(Object.keys(JSON.parse(json)[0]));  
  
}

function getValues(){
  var f='Москва|Солнцево|Петрова|2|Жильцов'
  var cnf=configJSON(); 
  var w=getTableToObj(cnf)
  Logger.log(lens(f).get(w))
  
}

function getKeys(){
  var f='Москва|Солнцево|Петрова|2'
  var cnf=configJSON(); 
  var w=getTableToObj(cnf)
  Logger.log(Object.keys(lens(f).get(w)))
  
}


//var cnf=configPollsParamers(); 

//var obj=lens("Тестовый опрос").get(getTableToObj(cnf)) 

//Logger.log(JSON.stringify(obj))
//Logger.log(JSON.stringify(Object.keys(obj)))






 /**
  var ss=SpreadsheetApp.getActiveSpreadsheet()
  var sheet=ss.getActiveSheet()
  var rangeRow=sheet.getRange("A1:D1").getValues()[0]
  var rangeCol=sheet.getRange("A2:B2").getValues()[0]
  var range=sheet.getRange("A3:F9").getValues()
  var headers=range.shift()
  */
 
function getTableToObj(cnf){
 
   var obj={};
  cnf.rangeData.map(function(row){
 // setRowToObj(cnf,obj,row)  
   
  var strKeys=getPropRow(cnf.rangeRow,cnf.headers,row)
  setProperties(strKeys,obj)
  var nz=getObjCol(cnf.rangeCol,cnf.headers,row)
  var l=lens(getPropRow(cnf.rangeRow,cnf.headers,row))
  obj=l.set(nz,obj)
 
})
//  Logger.log(JSON.stringify(obj))
//  Logger.log(lens('Москва|Солнцево|Петрова|2|Жильцов').get(obj))
  //https://learn.javascript.ru/keys-values-entries
//  Logger.log(Object.keys(lens('Москва|Солнцево|Петрова').get(obj)))
 //Logger.log(Object.values(lens('Москва|Солнцево').get(obj)))
// Logger.log(Object.entries(lens('Москва|Солнцево|Петрова').get(obj)))
 return obj

}






function sortObjByKeys(obj){
//var objJSON={"1":{"id option":1},"3":{"id option":3},"2":{"id option":2}}
//var obj=JSON.parse(objJSON)
var ordered = {};
Object.keys(obj).sort().forEach(function(key) {
  ordered[key] = obj[key];
});
//  Logger.log(JSON.stringify(ordered))
// Возврат {"1":{"id option":1},"2":{"id option":2},"3":{"id option":3}}
return ordered

}


var fConcatKeys=function(arrKeys_,el){
  return function(el){return [el].concat(arrKeys_)}
}
function filterByVal(obj,f){
//function filterByVal(obj,arrKeys){
//var cnf=configPollsParamers(); 
//var obj=sortObjByKeys(lens("Тестовый опрос").get(getTableToObj(cnf)))
// {"1":{"Parametrs":"Вопрос 1","correct_option_id":false},"2":{"Parametrs":"Вопрос 3","correct_option_id":true},"3":{"Parametrs":"Вопрос 2","correct_option_id":false}}

var filtred = {};

//var f=fJoinKeys(arrKeys)
//   Logger.log(f("1").join(delimetr()))

   var filtrArrKeys=Object.keys(obj).filter(function(el) { return lens(f(el).join(delimetr())).get(obj)})  
//Logger.log(lens(e[0]).get(obj))
  filtrArrKeys.forEach(function(key) {
  filtred[key] = obj[key];
});
// Logger.log(JSON.stringify(filtred))
// Возврат {"2":{"Parametrs":"Вопрос 3","correct_option_id":true}}
return filtred
}




function testArg(){
  var Ar=[
     [1, 10, 100],  
     [1, 20, 200],  
     [2, 10, 300]
  ]
var cnf=configPollsParamers(); 
var obj=lens(data['question']).get(getTableToObj(cnf))
var paramsDel=cnf.rangeCol
var dataOptional={}

Object.keys(obj).forEach(function(key,i,arr){
 
  Object.keys(obj[key]).map(function(el,j,parr){
    
    Logger.log('val '+obj[key][el])
    if(obj[key][el]!==""){ 
    Logger.log('del'+el)
    dataOptional[el]=obj[key][el]
    var delindx=paramsDel.indexOf(el)
    if(delindx>-1){
      paramsDel.splice(delindx,1)
           }
      else{
        
        
      }
     
    }
    else
    {
      
    }
    
  })
  
})
  Logger.log(paramsDel)
  Logger.log(data1)
}
  

function som2(){ 
 var arr = [].slice.call(arguments);
/* var arr=[1000,[
     [bbbb, 100],  
     [fjf, 200],  
     [wewe1, 300]
  ],
           [
     [bn,100],  
     [hlkkhg, 200],  
     [bh, 300]
  ]
          ] */
var basePrace=arr.shift();
  var res=[]
  var data2=arr.map(function(Ar){return arrayColumn(Ar,0)})
  res.push(result(data2).map(function(a) {return a.join('+')}));
  var data1=arr.map(function(Ar){return arrayColumn(Ar,1)})
  res.push(result(data1).map(function(a) {return basePrace+eval(a.join('+'))}));
 
   Logger.log(res)
   return res
}
function som1(){ 
  var arr = [].slice.call(arguments);
var basePrace=arr.shift();
return arr.map(function(Ar){return arrayColumn(Ar,2)});
}



function result(data){
 return  data.reduce(
    function(a, b) {return a.reduce(
       function (r, v) {return r.concat(
          b.map(function(w) {return [].concat(v, w);})
          );},
        []
    );}
    
);
}


//var arrayColumn = function(n,arr) {return  arr.map(function(x) {return x[n]})};
//var arrs=function(n,arr){return  arr.map(function(a){return arrayColumn(n,a)})}
//var arrs=function(n,arr){return  arr.map(function(a){return a.map(function(x) {return x[n]})})}
var BasePriceEval=function(basePrice,delim,a) {return function (a){return basePrice+eval(a.join(delim))}};
var JoinEval=function(delim,a) {return function (a){return a.join(delim)}};
//var addBasePrice=function(basePrice,indx,arr){return map(result(arrs(indx,arr)), basePrice)}
//var joinArraysColumns=function(curryJoin,indx,arr){return map(result(arrs(indx,arr)), curryJoin)}
//var addArraysColumns=function(fn,indx,arr){return map(result(arrs(indx,arr)), fn)
var addArraysColumns=function(fn,n,arr){return map(result(arr.map(function(a){return a.map(function(x) {return x[n]})})), fn)}
function som3(){ 
 var arr = [].slice.call(arguments);
 var currybasePrice=BasePriceEval(arr.shift(),"+");
 var curryJoin=JoinEval("+");
//return  [joinArraysColumns(curryJoin,0,arr),addBasePrice(currybasePrice,1,arr)]
return  [addArraysColumns(curryJoin,0,arr),addArraysColumns(currybasePrice,1,arr)]
}

