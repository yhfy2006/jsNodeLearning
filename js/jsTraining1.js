
//1
function add(x,y)
{
  return x+y;
}

function sub(x,y)
{
  return x-y;
}

function mul(x,y)
{
  return x*y;
}

var a = 3,b=4;

//console.log(add(a,b));
//console.log(sub(a,b));
//console.log(mul(a,b));

//2
function identityf(x)
{
  return function()
  {
    return x;
  }
}
var three = identityf(3);
//console.log(three());

//3

function addf(x)
{
  return function(y)
  {
    return (x+y);
  }
}
//console.log(addf(2)(3));


//3

function liftf(operation)
{
  return function (x)
  {
    return function(y)
    {
      return operation(x,y);
    };
  };
}


//4
function curry(operation,x)
{
  return function(y)
  {
    return operation(x,y);
  };
}

var add3 = curry(add,3);

//console.log(add3(4));console.log(add3(4));

//5


var inc = function(x)
{
  return x+=1;
}

var inc = addf(1);
var inc2 = liftf(add)(1);
var inc3 = curry(add,1);

//console.log(inc(inc(4)));

//6
function twice(operation)
{
  return function(x)
  {
    return operation(x,x);
  };
}

var doubl = twice(add);
//console.log(doubl(11));
var square = twice(mul);
//console.log(square(11));

//7
function reverse(operation)
{
  return function(x,y)
  {
    return operation(y,x);
  };
}
var bus = reverse(sub);
//console.log(bus(3,2));

//8
function composeu(operation1,operation2)
{
  return function(x)
  {
    return operation2(operation1(x));
  };
}
//console.log(composeu(doubl,square)(5));


function composeb(operation1,operation2)
{
  return function(x,y,z)
  {
    return operation2(operation1(x,y),z);
  }
}
//console.log(composeb(add,mul)(2,3,7));

function once(operation)
{
  var called = false;
  return function(x,y)
  {
    if(!called)
    {
        called=true;
        return operation(x,y);
    }else return undefined;
  };
}

var add_once = once(add);
//console.log(add_once(3,4));
//console.log(add_once(3,5));

function fromTo(x,y)
{
	return function()
	{
		if(x<y)
		{
 		  return x++;
		}else return undefined;
	}
}

var index = fromTo(0,3);
//console.log(index());
//console.log(index());
//console.log(index());
//console.log(index());


function element(array,operation)
{
 	return function()
	{
		return array[operation()];
	}
}
var ele = element(['a','b','c','d'],fromTo(1,3));
//console.log(ele());
//console.log(ele());
//console.log(ele());
 

var containerArray = [];
function collect(gen,array) {
	
	return function()
	{
		var value = gen();
		if(value!==undefined)
		{
			array.push(value);
		}
		return value;
	};
}

var col = collect(fromTo(5,7),containerArray);
col();
//console.log(containerArray);
col();
//console.log(containerArray);
col();
//console.log(containerArray);



function filter(gen,func)
{
	var value = 0;
	return function()
	{
		value = gen();
		while(true)
		{
 			if(func(value)) 
			{
				break;
			}
			else{
				value = gen();
			}
	 	}
		return value;
	};
}

var fil = filter(fromTo(0,5),function third(value){
	return (value%3)===0;
});

//console.log(fil());
//console.log(fil());

function concat(func1,func2)
{
	var value;
	return function(){
		value = func1();
		if(value!==undefined) return value;
		else return func2();
	}
}

var con = concat(fromTo(0,3),fromTo(0,2));
/*
console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());
console.log(con());
*/

function counter(x)
{
	var obj = {
		 next : function() {
			return ++x;
		},
		prev:function()
		{
			return --x;
		}
	}
	return obj;	
}


var object = counter(10);
next = object.next;
prev = object.prev;
/*
console.log(next());
console.log(prev());
console.log(prev());
console.log(prev());
console.log(next());
*/


function revocable(func)
{
	return {
		invoke:function(arg)
		{
			if(unary!==undefined)
			{
				return unary(ary);
			}
		},
		revoke: function()
		{
			unary=undefined;
		}
	}
	
}

var rev = revocable(identityf(7));


function gensymf(letter)
{
	 var num = 0;
	return function ()
	{
		num+=1;
		return letter+num;
	}
}

var geng = gensymf("G"),
	genh = gensymf("H");
	console.log(geng());
	console.log(genh());
	
function gensymff(fuc,seed)
{
	return function(prefix)
	{
		var number = seed;
		return function()
		{
			number = fuc(number);
			return prefix+number;
		}
	}
}
	
var gensymf = gensymff(inc,0);
	geng = gensymf("G");
	genh = gensymf("H");
	
console.log(geng());

function fibonaccif(a,b) {
	return function ()
	{
		var next=a;
		a=b;
		b+=next;
		return next;
	};
}
 
var fib = fibonaccif(0,1);
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());


function m(value,source)
{
	return{
		value:value,
		source:typeof source==='string'?source:String(value)
	};
}

 

function addm(m1,m2) {
	
	return{
		value:m1.value+m2.value,
		source:"("+m1.source+"+"+m2.source+")"
	};	
}
 console.log(JSON.stringify(addm(m(3),m(4))));
 console.log(JSON.stringify(addm(m(1),m(Math.PI,"pi"))));


function liftm(func,funcString) {
	return function(m1,m2)
	{
		
		return m(func(typeof m1==='number'?m1:m1.value,typeof m1==='number'?m2:m2.value),
		"("+(typeof m1==='number'?m1:m1.source)+funcString+(typeof m1==='number'?m2:m2.source)+")");
	};
}

var addm = liftm(add,"+")
var mulm = liftm(mul,"*")

console.log(JSON.stringify(addm(m(3),m(4))));
console.log(JSON.stringify(mulm(m(3),m(4))));
console.log(JSON.stringify(mulm(3,4)));

/*
var sae = [mul,3,3]
function exp1(x) {
	return Array.isArray(value)?value[0]:(
	
	)
}
function exp() {
	
}


console.log(exp(sae));
console.log(exp(42));
*/

function addg(first) {
    function more(next) {
        if (next === undefined) {
            return first;  
        }  
        first += next;
        return more; 
    }
    if (first !== undefined) {
        return more;
    }
}


console.log(addg(2)(3)());

function liftg(binary) {
    return function (first) {
        if (first === undefined) {
            return first;
        }
        return function more(next) {
            if (next === undefined) {
                return first;
            }
            first = binary(first, next);
            return more;
        };
    };
}

function arrayg(first) {
 		var anarray = [1]; 
	  	function more(next) {
	        if (next === undefined) {
	            return anarray;  
	        }  
	         anarray.push(next);
	        return more; 
	    }
		return more(first);
	    if (first !== undefined) {
	        return more;
	    }
}

console.log(arrayg(3)(4)());

function continuize(mathfuncion) {
	return function(callbackfunc,x)
	{
		return callbackfunc(mathfuncion(x));
	}
}

var sqrtc=continuize(Math.sqrt);
//sqrtc(alert,81);

function vector() {
    var array = [];

    return {
        get: function get(i) {
            return array[i];     
        },
        store: function store(i, v) {
            array[i] = v;    
        },
        append: function append(v) {
            array.push(v); 
        }
    };
}




/*
Write a function addg that adds from many invocations, until it sees an empty invocation.
addg()				//
addg(2)()			//2
addg(2)(7)()		//9
addg(3)(4)(0)()		//7
addg(1)(2)(4)(8)()  //15
*/
