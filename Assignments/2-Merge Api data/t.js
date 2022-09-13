var master="http://localhost:8080/user_master";
var secondary="http://localhost:8080/user_secondary";


var masterData=[]
var secondaryData=[]
fetch(master).then((res)=>{
    return res.json()
}).then((data)=>{
    // console.log(data);
    masterDataR(data)
})

const masterDataR=async(master)=>{
    fetch(secondary).then((res)=>{
        return res.json()
    }).then((data)=>{
        // console.log(data);
        secondaryDataS(master,data)
    })
}

const secondaryDataS=async(m,d)=>{
    // console.log(m,d);
    const merge = (m, d) => {
    const temp = []

    m.forEach(x => {
        d.forEach(y => {
            if (x.id === y.attendeeId) {
                temp.push({ ...x, ...y })
            }
        })
    })
    return temp
    }
    var arr=(merge(m,d))
    // console.log(arr);
    changeKeys(arr)
}

var merged=[]

const changeKeys=async(arr)=>{
    for(var i=0;i<5;i++){

        console.log(arr[i]);
        // var keys=[]
        // var vals=[]
        // var obj=[]
        // for(let x in arr[i]){
        //     // console.log(arr[i][x]);
        //     keys.push(x)
        //     vals.push(arr[i][x])
        // }
        // for(var i=0;i<keyfields.length;i++){
        //     obj[keyfields[i]]=vals[i]
        // }
        // console.log(obj);
        // console.log(obj);

    }
}

