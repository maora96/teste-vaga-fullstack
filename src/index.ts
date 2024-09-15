import { Row } from "./common/types.ts";
import { formatMoney } from "./common/utils.ts";
import csv from "csv-parser";
import fs from "fs";

const readFile = async (): Promise<Row[]> => {
  const results: Row[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("src/data/data.csv")
      .pipe(csv())
      .on("data", (data: Row) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", reject);
  });
};

const start = async () => {
  const array = await readFile();
  const formattedMoneyArray = array.map((row: Row) => ({
    ...row,
    vlTotal: formatMoney(parseFloat(row.vlTotal)),
    vlPresta: formatMoney(parseFloat(row.vlPresta)),
    vlMora: formatMoney(parseFloat(row.vlMora)),
    vlMulta: formatMoney(parseFloat(row.vlMulta)),
    vlOutAcr: formatMoney(parseFloat(row.vlOutAcr)),
    vlIof: formatMoney(parseFloat(row.vlIof)),
    vlDescon: formatMoney(parseFloat(row.vlDescon)),
    vlAtual: formatMoney(parseFloat(row.vlAtual)),
  }));

  //  console.log(formattedMoneyArray);
};

start();
