import { MongoClient } from "mongodb";

const uri = "mongodb+srv://greatstack:YOUR_PASSWORD@cluster0.ods5dfo.mongodb.net/?appName=Cluster0";

const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;