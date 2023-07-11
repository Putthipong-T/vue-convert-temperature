// read d2t-hh49xIxIfbxfyJ5AKX6IGfI7sQDVZjufDxS2HtaH86NZ53N0rQsUZgl2dCd2P0uQU9KjiP5cibJqdj-Y4w==

import { InfluxDB, Point } from '@influxdata/influxdb-client-browser';
export async function myQuery(timeRange) {
// async function myQuery(timeRange) {
  // const { InfluxDB, Point } = require('@influxdata/influxdb-client-browser');
 
  //ubuntu
  const token ='c3o6PsZ5wAs25twWrsdApE73eBm4KjkyAGLN--5LVXwGGYHBAmVjJ-7raBP2thvOdKLXcoOscdMyzBwXsehjYQ=='
  const url = 'http://18.142.197.178:8086';
  let org = `kmitl`
  let bucket = `test_data`
  // let bucket = `Test_data2`

  // const token = 'd2t-hh49xIxIfbxfyJ5AKX6IGfI7sQDVZjufDxS2HtaH86NZ53N0rQsUZgl2dCd2P0uQU9KjiP5cibJqdj-Y4w==';
  // const url = 'http://127.0.0.1:8086';
  // const orgID = '4faf28548de05ae3';
  // const org = 'Vue-qonnect';
  // const bucket = 'test2';
  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  const fluxQuery = `from(bucket:"${bucket}") 
  |> range(start:${timeRange}) 
  |> filter(fn: (r) => r._measurement == "temp")
  |> filter(fn: (r) => r["_field"] == "test")
  |> aggregateWindow(every: ${getInterval(timeRange)}, fn: mean)
  |> yield(name: "mean")`;

  function getInterval(timeRange) {
    if (timeRange === '-30m') {
      return '10s';
    }else if (timeRange === '-45m') {
      return '10s';
    }else if (timeRange === '-1h') {
      return '10s';
    }else if (timeRange === '-3h') {
      return '20s';
    } else if (timeRange === '-6h') {
      return '40s';
    } else if (timeRange === '-12h') {
      return '1m';
    } else if (timeRange === '-1d') {
      return '4m';
    }
  
    // Default interval if none of the specific time range values match
    return '5s';
  }
  
  
  
  

  const tempValue = [];
  const time = [];

  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
    const o = tableMeta.toObject(values);
    tempValue.push(o._value);
    time.push(o._time);
  }

  return { tempValue, time };
}
// module.exports = {myQuery};

// myQuery('-1d').then(result => {
//   console.log(result.time);
//   console.log(result.tempValue);
// }).catch(error => {
//   console.error(error);
// });
