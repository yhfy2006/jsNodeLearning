var a  = [1,2,3,4,5];
var b = [2,3,6,7];

console.log(diffIndexes(a,b));

function diffIndexes(a,b)
{
	var indexArray = Array()
	for (i = 0; i < b.length; i++) { 
	   if (a.indexOf(b[i])==-1 ) {
			indexArray.push(i);
		} 
	}
	return indexArray;
}
