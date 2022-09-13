var arr = ["I'm","leah","and","I'm","Nikita","and","welcome","to","the","data","cloud","live","demo","sldvn","and","welcome","to","the","data","cloud","live","demo","sldvn","and","welcome","to","the","data","cloud","live","demo","sldvn","kahsdb"]

var c=1
var arr1=[]
var s='';
for(var i=0;i<arr.length;i++){
    if(c<9){
        s+=arr[i]+' '
        console.log(i,"if",c);
        c++;
        
    }
    if(c>8 || i==(arr.length-1)){
        arr1.push(s)
        console.log(i,"else",c);
        c=1
        s=''
        // continue;
    }
}
console.log(arr1,arr.length);