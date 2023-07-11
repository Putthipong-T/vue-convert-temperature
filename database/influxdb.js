// token local : WpxhcdJyqLV3jZ723dA2t54hYBtBRlvPSAC-gUfHzsGzf5eGPlCKr-n08LX2WLBTxiI9B1f_0tI67ts5It1rAQ==
// token ubuntu :c3o6PsZ5wAs25twWrsdApE73eBm4KjkyAGLN--5LVXwGGYHBAmVjJ-7raBP2thvOdKLXcoOscdMyzBwXsehjYQ==
// token online : 'nDNpNbdx2oGeRiLK3CbXMA_DPlKdwLtHC9VWBY4DqseAnOWLm7d1yJtyc82VTgX24DaBaZQJ9yu0MhrC_tyjZQ==
const { InfluxDB, Point } = require('@influxdata/influxdb-client');


const token ='c3o6PsZ5wAs25twWrsdApE73eBm4KjkyAGLN--5LVXwGGYHBAmVjJ-7raBP2thvOdKLXcoOscdMyzBwXsehjYQ==';
console.log(token);

const url = 'http://18.142.197.178:8086'; //ubuntu
// const url = 'http://ec2-18-142-197-178.ap-southeast-1.compute.amazonaws.influxdata.com/:8086';
// const url = 'http://127.0.0.1:8086'; //local
// const url = 'https://us-east-1-1.aws.cloud2.influxdata.com:8086' // online

const client = new InfluxDB({ url, token, timeout: 10000 });
//ubuntu
let org = `kmitl`
let bucket = `test_data`

// local db
// let org = `Vue-qonnect`
// let bucket = `test2`

// online db
// let org = `Convert temp`
// let bucket = `test2`
console.log("org: ",org, "bucket: ",bucket)
let writeClient = client.getWriteApi(org, bucket, 'ns')

for (let i = 0; i < 10000; i++) {
  let randomValue = (Math.random() * (60 - 20) + 20);
  let point = new Point('temp')
    .tag('tagname1', 'tagvalue1')
    .floatField('test', randomValue)

  void setTimeout(() => {
    console.log(i, ':write' , randomValue)
    writeClient.writePoint(point)
  }, i*5000) // separate points by 1 second

  void setTimeout(() => {
    console.log(i, ':flush' )
    writeClient.flush()
  }, (i+1)*5000)
}