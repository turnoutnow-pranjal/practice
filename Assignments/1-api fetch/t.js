const p = document.querySelector('.catch')

let a = document.createElement('p').innerText = "working";
p.append(a)
// console.log(p);

/*fetching querries from a json file:*/
fetch("./req.json").then((res) =>
    res.json()
    // console.log(res.json);
).then((data) => {
    // console.log(data);
    afunc(data)
})


/*a function that seperates and pushes keywords*/ 
const afunc = async (data) => {
    var date = [];
    var itr = [];
    var title = [];
    var count = [];

    for (let x in data) {
        date.push(x)
        var c = 0
        for (let y in data[x]) {
            c++
            title.push(y)
            count.push(data[x][y])
            // console.log(date,itr,title,count);
        }
        itr.push(c++)
    }
    // console.log(date,itr,title,count);
    var qr=[]
    var ct=[];
    var l = 0;
    for (var i = 0; i < date.length; i++) {
        let j = 0;
        let k = 1;
        
        // console.log(date[i], itr[i]);
        while (j < itr[i]) {
            var url=`https://api.nytimes.com/svc/books/v3/lists/${date[i]}/${title[l]}.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl`
            qr.push(url);
            ct.push(count[l]);
            j++;
            l++;
        }
        
    }
    await querry(qr,ct)
}
var arr=[]
const querry=async(qr,ct)=>{
    // console.log(ct);
    for(var i=0;i<qr.length;i++){
        await arr.push(qr[i])
    }
    // console.log(arr);
    await  delayfetch(arr,ct);
}


/*adding delay in iterations*/
function delayfetch(arr,ct) {
    // console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        (function (i) {
            setTimeout(function () {
                // fetchApi(arr[i],ct[i])
            }, 5000*i);
        })(i);
    };
}


/* main fetch API */
const fetchApi=async(url,c)=>{
    var res;
    var data;
    var ar;

    setTimeout(async()=>{
        try {
            let res = await fetch(url)
            let data = await res.json()
            let ar = (data.results.books)
            var result = await JSON.stringify(...ar.slice(0, c), undefined, 4)
            document.write("QUERRY: ")
            document.write("RESULT: " +"<p style='font-family:monospace;'>" +c +"</p>"+ "<br>")
            document.write("<b>" + "<p style='font-family:monospace;'>" +result+"</p>" + "<br>" + "<br>" + "</br>")
            document.write("--------------------------------------------------------------------------" + "<br>")
        }
        catch (err) {
            console.log('err', err)
        }
    },5000)
    
}

