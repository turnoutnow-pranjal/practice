// const keyfields = require("./fields");

var master="http://localhost:8080/user_master";
var secondary="http://localhost:8080/user_secondary";
var fields="http://localhost:8080/fields"


var objfields=[]

fetch(fields).then((res)=>{
    return res.json()
}).then((data)=>{
    // console.log(data);
    objfields.push(data)
    // console.log(objfields);
})



fetch(secondary).then(result => {
   return  result.json();
}).then((data)=>{
    masterFunc(data);
})

var masterData=[];
var secondaryDataId=[];
var mergedData=[]
const masterFunc=async(data)=>{
    for(let x in data){
        secondaryDataId.push(data[x].attendeeId)
        
    }
    fetch(master).then(result => {
        return  result.json();
     }).then((data)=>{
        filterMasterFunc(data, secondaryDataId)
     })
     const filterMasterFunc=async(data, secondaryDataId)=>{
        
        for(let i=0;i<10;i++){
            for(let x in data){
                if(secondaryDataId[i]===data[x].id){
                    var arr=[]
                    for(let y in data[x]){
                        arr.push(data[x][y])
                    }
                    // console.log(objfields);
                    // console.log(data[x]);
                    // var obj={
                    //     attendee_id:data[x].id,
                    //     first_name:data[x].firstName,
                    //     last_name:data[x].lastName,
                    //     attendee_type:data[x].attendeeType,
                    //     zip:null,
                    //     country:null,
                    //     city:null,
                    //     registered:null,
                    //     profileImage_url:null,
                    // }
                    var obj2={};
                    
                    for(let i=0;i<keyfields.length;i++){
                        if(arr[i]!==undefined){
                            obj2[keyfields[i]]=arr[i]
                        }
                        else{
                            obj2[keyfields[i]]=''
                        }
                    }
                    console.log(obj2);
                    mergedData.push(obj2)
                }
            }
        }
    }
    mergeSecondarydata(mergedData,data)
}
var finalMerged=[];
const mergeSecondarydata=async(mergedData,data)=>{
    setTimeout(()=>{
        for(let j=0;j<mergedData.length;j++){
            for(let x in data){
                // console.log(x);
                if(mergedData[j].attendee_id===data[x].attendeeId){
                    // console.log(data[x].files.length);
                    // mergedData[j].zip=data[x].zip;
                    // mergedData[j].country=data[x].country;
                    // mergedData[j].city=data[x].city;
                    // mergedData[j].registered=data[x].registered;
                    var arr=[]
                    var arr2=[]
                    for(let y in data[x]){
                       if(typeof(data[x][y])=="object" && data[x][y].length>0){
                            // console.log(data[x][y][data[x][y].length-1].fileURL);
                            arr.push(data[x][y][data[x][y].length-1].fileURL)
                        }
                        else if(y!="attendeeId"){
                            arr.push(data[x][y])
                        }
                        if(y!=="attendeeId")
                        arr2.push(y)
                    }
                    // console.log(arr2,arr);
                    var obj2={}
                    for(let i=0;i<arr2.length;i++){
                        obj2[arr2[i]]=arr[i]
                    }
                    console.log(obj2,"obj2");
                    for(var a in data[x]){

                    }
                }
            }
        }
        // console.log(mergedData);
    },1000)
}

// console.log(keyfields);

/*
attendee_id
first_name
last_name
attendee_type
zip
country
city
registered
profileImage_url
*/
