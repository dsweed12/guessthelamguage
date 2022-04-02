import {Component} from "react"
import Guessthelanguage from "./components/Guessthelanguage";

const fs = require("fs");
const csv = require("csv-parser");
const csv_builder = require("../util/csv_builder");
const { resolve } = require("path");

const csvFilePath =
    "/Users/dorisweed/guessthelanguage/src/languages_with_texts.csv";

class App extends React.Component {
  state = {data:[], correct_answers: 0, wrong_answers: 0 };
  
  function readCSV() {
    return new Promise(async (resolve, reject) => {
      results = []
      await fs
        .createReadStream(filepath)
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
        })
        .on("error", (error) => reject(results))
        .on("end", () => {
          resolve(results);
        });
    });
  }
async function build() {
  const output = await readCSV(this.csvFilePath);
  return output
}

async function componentDidMount() {
  const languages = await readCSV(this.csvFilePath);  
    this.setState({data: languages})
  }

render(){
  results = [];
    return (
      <div className="guessthelanguage">
    <Guessthelanguage data={this.state.data} />
    </div>
                )
                        }
                                }
export default App
