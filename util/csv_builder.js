const fs = require("fs");
const languages_csv = "src/languages_with_texts.csv";

module.exports = {
  build() {
    try {
      fs.readFile(languages_csv, "utf8", function (err, data) {
        let lines = data.split("\n");
        let formatted = lines[0] + "\n";

        //  capture the targeted substrings - the text of each column (separated within quotes)
        let re1 = new RegExp("([^,]*)(,[^,]*,[^,]*)");
        let re2 = new RegExp("([^,]*,)([^,]*)(,[^,]*)");
        let re3 = new RegExp("([^,]*,[^,]*,)([^,]*)");

        // go through each line and wrap each column in quotes
        for (i = 1; i < lines.length; i++) {
          let row = lines[i];
          let col1 = row.match(re1);
          let col2 = row.match(re2);
          let col3 = row.match(re3);
          let language = col1[1];
          let code = col2[2]
          let sentence = col3[2];
          formatted += "\n";
          formatted += `"${language}", "${code}", "${sentence}"`;
        }

        fs.writeFileSync(languages_csv, formatted);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
