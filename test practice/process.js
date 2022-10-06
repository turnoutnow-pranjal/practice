const fs=require('fs')

fs.readFile('./test practice/uploadedThis.json', 'utf-8',(err,data)=>{
    try {
        // console.log(JSON.parse(data));
    var str=JSON.parse(data);
    var string=JSON.parse(str.replaceAll('\"','"'))
    // console.log(string);
    fs.writeFile('./test practice/res.json',JSON.stringify(string,undefined,2),(err,resp)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('file written');
        }
    })
    
    } catch (error) {
        console.log(error,err);
    }
})

const {
    DynamoDBClient,
    paginateListTables,
  } = require("@aws-sdk/client-dynamodb");
  

  const paginatorConfig = {
    client: new DynamoDBClient({}),
    pageSize: 25
  };
  const commandParams = {};
  const paginator = paginateListTables(paginatorConfig, commandParams);
  
  const tableNames = [];
  for await (const page of paginator) {
    
    // page contains a single paginated output.
    tableNames.push(...page.TableNames);

  }