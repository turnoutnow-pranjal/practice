


const URL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl"


fetch("./request.json").then(response => response.json()).then((data) => data.req[0]).then((data) => {
    // console.log(data);
    
    for (var date in data) {
        var datev = date;
        // console.log(datev);
        var c = 0
        var arr = []
        var d = [], t = [], co = [];


        async function printy() {
            // for (let i = 0; i < 10; ++i) {
               
                //wait for 500 milisecond
                for (var title in data[date]) {
                    c++
                    d, t, c, datev;
                    await waitforme(3000);
                    await console.log(date,title,data[date][title]);
                    // console.log(c);
                    d.push(date)
                    t.push(title)
                    co.push(data[date][title])
                    task(title, data[date], c++, datev)
                // }
                // console.log(i);
            }
        }
        console.log(co,"coo");
        printy();
        
    };


})

function task(title, date, c, datev) {
    // console.log(date,title,c);

    setTimeout(() => {
        var titlev = title;
        var countv = date[title]

        // getApi(datev,titlev,countv)
    }, 4000 * c);
}



async function getApi(d, t, c) {
    try {
        let res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${d}/${t}.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl`)
        let data = await res.json()
        let ar = (data.results.books)
        var result = await JSON.stringify(...ar.slice(0, c), undefined, 4)
        document.write("QUERRY: ")
        document.write(d + " " + t + " " + c + "<br>");
        document.write("RESULT: " + c + "<br>")
        document.write("<b>" + result + "<br>" + "<br>" + "</br>")
        document.write("--------------------------------------------------------------------------" + "<br>")
    }
    catch (err) {
        console.log('err', err)
    }
}


function waitforme(ms) {

    // here is the key!
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms);
    })
}

async function printy() {
    for (let i = 0; i < 10; ++i) {
        await waitforme(500);
        //wait for 500 milisecond

        console.log(i);
    }
}
// printy();




