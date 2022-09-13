// import axios from "./node_modules/axios/lib/axios";

const a = document.getElementsByTagName("h3");
a[0].textContent = "Querry: ";
var c = document.querySelector('catch')
console.log(c);
// c.setAttribute("font-weight","bold")
// c.innerText="abcsd"

const URL="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl"
// c[0].innerText="blaah"
// c[0].setAttribute("color","red")
// console.log(a)

// // var req;
// const getReq=async()=>{
//     try {
//         req= await fetch("./request.json").then((resp)=>{
//             return resp.json
//         })
//         console.log(req,"req")
//     } catch (error) {
//         console.log(error)
//     }
// }
// getReq()
// // console.log(req)

// var request;
// fetch("./request.json").then((res)=>{
//     return res.json();
// }).then((data)=>{
//     request=data.req
//     // console.log(data.req)
// })

// console.log(request)
// document.write("Querry:");

// fetch("./request.json").then(response => response.json()).then(data=>c[0].innerText=(JSON.stringify(data.req[0])))


fetch("./request.json").then(response => response.json()).then((data) => data.req[0]).then((data) => {

    for (var date in data) {
        var datev = date;
        // console.log(datev);
        var c=0
        var arr=[]
        var d=[],t=[],c=[];
        for (var title in data[date]) {
            c++
            d,t,c,datev;
            // console.log(title);
                // var titlev = title;
                // d.push(datev)
                // var countv = data[date][title]
                // // console.log(data[date][title])
                // document.write("QUERRY: ")
                // document.write(datev + " " + titlev + " " + countv + "<br>");
                // document.write("RESULT: "+ "<br>")
                // // document.write(getApi(datev,titlev,countv))
                // // getApi(datev,titlev,countv)
                // // querryList.push()
                // arr.push(datev,titlev,countv)
                // t.push(titlev)
                // c.push(countv)
            
            // console.log(arr);
            task(title,data[date],c++,datev)
            
            
        }
        
        
       
        
    };
    
    
})

 function task(title,date,c,datev){
    setTimeout(() => {
         var titlev = title;
                // d.push(datev)
                var countv = date[title]
                // console.log(date[title])
                    // var querry=document.querySelector("display")
                    // querry.textContent=("QUERRY: ",datev + " " + titlev + " " + countv + "<br>")
                // document.write("QUERRY: ")
                // document.write(datev + " " + titlev + " " + countv + "<br>");
                    // var resu=document.querySelector('catch')
                    // resu.textContent=(result,"<br>")
                // document.write("RESULT: "+ "<br>")
                // document.write(getApi(datev,titlev,countv))
                    getApi(datev,titlev,countv)
                // querryList.push()
                // arr.push(datev,titlev,countv)
                // t.push(titlev)
                // c.push(countv)
    }, 4000*c);
 }


// function setIntervalX(callback, delay, repetitions) {
//     var x = 0;
//     var intervalID = window.setInterval(function () {

//        callback();

//        if (++x === repetitions) {
//            window.clearInterval(intervalID);
//        }
//     }, delay);
// }


// const getApi=async()=>{
//     try {
//         await fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?a pi-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl").then((res)=>
//         res.json()
//     ).then((data)=>
//         console.log(data)
//     )
//     } catch (error) {
//         console.log('err:',error);
//     }
// }
// getApi()

// fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?a pi-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl").then((res)=>
//     res.json()
// ).then((data)=>
//     console.log(data)
// )

async function getApi(d,t,c){
    try{
    
    let res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${d}/${t}.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl`)

    // console.log(res)
    let data=await res.json()
    // document.write(JSON.stringify(...data.results.books))
    let ar=(data.results.books)
    // console.log(ar.slice(0,c));
    var result=await JSON.stringify(...ar.slice(0,c))
    // return(result+"<br>"+"<br>");
    // document.write(result+"<br>"+"<br>")
        document.write("QUERRY: ")
        document.write(d + " " + t + " " + c + "<br>");
            // var querry=document.querySelector("display")
            // querry.textContent=("QUERRY: ",d + " " + t + " " + c + "<br>")
        document.write("RESULT: "+ "<br>")
        document.write(result+"<br>"+"<br>"+"</br>")
            // var resu=document.querySelector('catch')
            // resu.textContent=(result,"<br>")
    }
    catch(err){
        console.log('err',err)
    }
}







