

const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const influxConfig = {
  url: 'http://18.142.197.178:8086',
  token: 'c3o6PsZ5wAs25twWrsdApE73eBm4KjkyAGLN--5LVXwGGYHBAmVjJ-7raBP2thvOdKLXcoOscdMyzBwXsehjYQ==',
  org: 'kmitl',
  bucket: 'test_data'
};

const influxClient = new InfluxDB({ url: influxConfig.url, token: influxConfig.token });

async function writeData() {
  try {
    const { org, bucket } = influxConfig;
    const writeApi = influxClient.getWriteApi(org, bucket);
    
    for (let i = 0; i < 10; i++) {
      const randomValue = Math.random() * (60 - 20) + 20;
      const point = new Point('measurement')
        .tag('tagname1', 'tagvalue1')
        .intField('field1', randomValue);

      writeApi.writePoint(point);
    }
    
    await writeApi.close();
    console.log('Data written successfully!');
    
    // Now execute the query
    await executeQuery();
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

async function executeQuery() {
  try {
    const { org, bucket } = influxConfig;
    const query = 'SELECT * FROM measurement';
    const queryApi = influxClient.getQueryApi(org);
    const result = await queryApi.collectRows(query, { bucket });

    // Process and handle the query results
    console.log(result);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

writeData();
