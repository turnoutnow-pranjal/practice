
var master="http://localhost:8080/user_master";
var secondary="http://localhost:8080/user_secondary";
var obj=require('./fields')

console.log(obj,"habgcha");
fetch(secondary).then(result => {
   return  result.json();
    // console.log(result);
}).then((data)=>{
    // document.write("<p style='font-family:monospace'>"+JSON.stringify(data,undefined,2)+"<br>");
    masterFunc(data);
})

var masterData=[];
var secondaryDataId=[];
var mergedData=[]
const masterFunc=async(data)=>{
    // await console.log(data);
    for(let x in data){
        // console.log(data[x].attendeeId);
        secondaryDataId.push(data[x].attendeeId)
        
    }
    // console.log(secondaryDataId);
    // for(let x in )
    // console.log(masterDataId);

    fetch(master).then(result => {
        return  result.json();
         // console.log(result);
     }).then((data)=>{
        //  document.write("<p style='font-family:monospace'>"+JSON.stringify(data,undefined,2)+"<br>");
        // filterMasterFunc(data, secondaryDataId)
     })
     const filterMasterFunc=async(data, secondaryDataId)=>{
        // console.log(data);
        // console.log(secondaryDataId);

        for(let i=0;i<secondaryDataId.length;i++){
            for(let x in data){
                if(secondaryDataId[i]===data[x].id){
                    // console.log(data[x].id);

                     obj={
                        attendee_id:data[x].id,
                        first_name:data[x].firstName,
                        last_name:data[x].lastName,
                        attendee_type:data[x].attendeeType,
                        zip:null,
                        country:null,
                        city:null,
                        registered:null,
                        profileImage_url:null,
                    }
                    mergedData.push(obj)
                }
            }
        }
     }
    //  console.log(data);
    // mergeSecondarydata(mergedData,data)
}

const mergeSecondarydata=async(mergedData,data)=>{
    // console.log(mergedData);
    // console.log(data);
    // setTimeout(()=>{
        // console.log(mergedData);
        for(let j=0;j<mergedData.length;j++){
            // console.log(mergedData[j].attendee_id);
            for(let x in data){
                // console.log(x);
                if(mergedData[j].attendee_id===data[x].attendeeId){
                    // console.log(data[x].files.length);
                    mergedData[j].zip=data[x].zip;
                    mergedData[j].country=data[x].country;
                    mergedData[j].city=data[x].city;
                    mergedData[j].registered=data[x].registered;
                    if(data[x].files.length>0){
                        // console.log(data[x].files[data[x].files.length-1].fileURL);
                        mergedData[j].profileImage_url=data[x].files[data[x].files.length-1].fileURL
                    }
                    
                }
            }
        }
        console.log(mergedData);
    // },100)
}

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