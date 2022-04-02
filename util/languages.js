const got = require("got");
const url = "https://cloud.google.com/translate/docs/languages";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const csv = require("csv-parser");

try {
  got(url).then((res) => {
    const languages_dom = new JSDOM(res.body.toString()).window.document;
    const csvWriter = require("csv-writer").createObjectCsvWriter;
    const languagesCSV = csvWriter({
      path: "../src/languages.csv",
      header: [
        { id: "language", name: "Language", title: "Language" },
        { id: "code", name: "Code", title: "ISO-639-1 Code" },
        { id: "text", name: "Text", title: "text" },
      ],
    })
    var data = [];
    const languages_list = languages_dom.querySelector("table tbody");
    var num = 0;
    for (i = 0; i < languages_list.children.length; i++) {
      var obj = {};
      var row = languages_list.children.item(i);
      // add to object language and code
      obj["language"] = row.children.item(0).innerHTML;
      obj["code"] = row.children.item(1).children.item(0).innerHTML;
      num = data.push(obj);
    }

    languagesCSV
      .writeRecords(data)
      .then(() =>
        console.log(`languages.csv written successfullly with ${num} languages`)
      );
  });
  //   async function getData() {
  //     let data;
  //     try {
  //         // use data to do anything after
  //         data = readCSV();
  //     } catch (error) {
  //         console.log(error)
  //     }
  //     return data;
  // }

  //export default readCSV;
} catch (err) {
  console.log(`Error in getting languages table:`, err.message());
}
