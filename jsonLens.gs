/** По мотивам статьи

 * Функциональный Javascript. Пишем свои линзы, часть 1
 * https://habr.com/ru/post/230649/
 * 
 */

function getProp(key,obj){
if (!obj.hasOwnProperty(key)) {
          obj[key]={};
          
	  	}
 
    
return obj[key]
}

function setRowToObj(cnf,obj,row){
  
  var strKeys=getPropRow(cnf.rangeRow,cnf.headers,row)
  setProperties(strKeys,obj)
  var nz=getObjCol(cnf.rangeCol,cnf.headers,row)
  var l=lens(getPropRow(cnf.rangeRow,cnf.headers,row))
  return l.set(nz,obj)
}
//возвращает  obj
function setProperties(strKeys,obj) {
  
	var key,lst=[]
    var lst = strKeys.split('|')
 lst.map(function(key) {
	 obj=	getProp(key,obj);
      
	})
  
	return obj;
}
function getObjCol(rangeCol,headers,row){

    var tempObj={}
   
    rangeCol.forEach(function(el){
    var i=headers.indexOf(el)  
    var val=row[i]  
    tempObj[el] =val                
    return         
    })
 return tempObj   
}

function getPropRow(rangeRow,headers,row){
var arr=rangeRow.map(function(el){
     var index=headers.indexOf(el) 
    // var indexLast=headers.indexOf(last_element) 
     var val=row[index]
return val
})
return arr.join("|")
}





//генерация гетеров
function get(prop) {
	return function(item) {
		return item[prop];
	};
}
//генерация сетеров изменяемых структур
function setMutable(prop) {
	return function(value, item) {
		item[prop] = value;
		return item;
	}
}
//генерация сетеров для неизменяемых структур
function setImmutable(prop) {
	return function(value, item) {
		var props = properties(item), //получаем список всех свойств объекта
			copy = props.reduce(function(lst, next) {
				lst[next] = item[next];
				return lst;
			}, {}); 
		copy[prop] = value; //меняем на новое значение
		return copy;
	};
}

//возвращает список свойств объекта obj
function properties(obj) {
	var key, lst = [];
	for (key in obj) {
	 	if (obj.hasOwnProperty(key)) {
		   lst.push(key);
	  	}
	}
	return lst;
}



function Lens(getter, setter) {
	//Если передан 1 параметр, то это название свойства
	if (arguments.length == 1) {
		var property = arguments[0];
		getter = get(property);
		setter = setImmutable(property);
	}
    return {
		modify: function (func, item) {
			var value = getter(item);

			return setter(func(value), item);
		},
        compose: function (lens) {
            return Lens(get2, set2);

            function get2(item) {
                return lens.get(getter(item));
            }

            function set2 (value, item) {
                var innerValue = lens.set(value, getter(item));
                return setter(innerValue, item);
            }
        },
        get: getter,
        set: setter
    };
}
function lens(cmd) {
	var lenses = cmd.split('|')
					.map(pass1(Lens));

	return lenses.reduce(function(lst, next) {
		return lst.compose(next);
	});
}
//функция которая из переданной ей на вход функции делает такую,
//которая игнорирует все переданные ей аргументы, кроме первого
function pass1(func) {
	return function(x) {
		return func(x);
	};
}
var isLensPath=function(l){return!l?false:true} // Возвращает true если путь ключей существует