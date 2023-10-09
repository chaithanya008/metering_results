import * as dotenv from "dotenv";
import MetiundoAPI from "./api";

dotenv.config();

const fromTimestamp = 1688162400000; // Saturday, July 1, 2023 12:00:00 AM GMT+02:00 DST
const toTimestamp = 1690840800000; // Tuesday, August 1, 2023 12:00:00 AM

function getCredentials() {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error("EMAIL or PASSWORD environment variables are not provided");
  }

  return { email, password };
}

async function getSinglePointTotalConsumption(
  api: MetiundoAPI,
  uuid: string,
  token: string
): Promise<number | null> {
  // readings represent all the readings value at a 15 minutes interval
  // so each reading object is an actual reading at 15 minutes
  const readings = await api.getTimerangeReadings(
    fromTimestamp,
    toTimestamp,
    uuid,
    token
  );

  if (!readings || !readings.length) {
    console.log("no readings returned for this time range");
    return null;
  }

  const firstReading = readings[0];
  const lastReading = readings[readings.length - 1];

  const firstConsumption = firstReading.energyOut;
  const lastConsumption = lastReading.energyOut;

  let maximumValue = -Infinity;
  const diffList = [];

  for (let i = 1; i < readings.length; i++) {
    const diff = Math.abs(readings[i].energyOut - readings[i - 1].energyOut);
    diffList.push(
      `${readings[i].energyOut} - ${readings[i - 1].energyOut} = ${diff}`
    );
    if (diff > maximumValue) {
      maximumValue = diff;
    }
  }
    
  const maxPower = maximumValue / 1000000

  console.log(`The maximum power (in kW) that was measured in month of July 2023: ${maxPower}`);

  // The overall electricity consumption (in kWh) for the month of July 2023
  return Math.abs(lastConsumption - firstConsumption) / 1000000;
}

(async () => {
  const credentials = getCredentials();
  const api = new MetiundoAPI(credentials);

  const token = await api.getAccessToken();

  if (!token) {
    console.log("unable to login to the API");
    return;
  }

  const points = await api.getMeteringPoints(token);
  if (!points) {
    console.log("unable to get all metering points");
    return;
  }

  let totalConsumption = 0;

  for (const point of points) {
    const { uuid } = point;

    const totalPointConsumption = await getSinglePointTotalConsumption(
      api,
      uuid,
      token
    );

    if (!totalPointConsumption) {
      continue;
    }

    totalConsumption += totalPointConsumption;
  }

  console.log(`The overall electricity consumption (in kWh) in the month of July 2023  = ${totalConsumption}`);
})();
