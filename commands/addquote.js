// add quote
exports.run = (client, message, args) => {
  console.log(`**********Executing heart on ${message.guild.name}**********`);

  const MongoClient = require("mongodb").MongoClient;
  const url = `mongodb://${process.env.MONGO_DB_USER}:${
    process.env.MONGO_DB_PASS
  }@ds121282.mlab.com:21282/dosebot_quotes`;
  const dbName = "dosebot_quotes";

  // --addquote murty this is a quote
  let str = message.content.replace(`--addquote`, ``, -1).replace(/-/g, ``, -1);
  // [murty, this, is, a, quote]
  let strArr = str.split(` `);
  let author = strArr[0];
  let quoteToAdd = strArr.splice(1, strArr.length).join(` `);

  console.log(`Adding quote - Author: ${author} Quote: ${quoteToAdd}`);

  MongoClient.connect(
    url,
    function(err, client) {
      console.log(`Connected to Mongo`);
      const db = client.db(dbName);
      const collection = db.collection("quotes");

      collection.insertOne({ quote: quoteToAdd, author: author });

      client.close();
    }
  );
};