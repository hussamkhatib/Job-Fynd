import Papa from "papaparse";

const CSVDownload = (data: any, filename: string, bom?: boolean) => {
  const csv = Papa.unparse(data);
  /**
   * Note: If you want to open your CSV files in Excel, you might want to set bom={true} or bom, default is false.
   * This option adds the so called BOM byte '\ufeff' to the beginning of your CSV files and tells Excel that the encoding is UTF8.
   * @link https://github.com/Bunlong/react-papaparse#-csvdownloader
   */
  const bomCode = bom ? "\ufeff" : "";

  let csvURL = null;
  const csvData = new Blob([`${bomCode}${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const navObj: any = window.navigator;
  if (navObj.msSaveBlob) {
    csvURL = navObj.msSaveBlob(csvData, `${filename}.csv`);
  } else {
    csvURL = window.URL.createObjectURL(csvData);
  }

  const link = document.createElement("a");
  link.href = csvURL as string;
  link.setAttribute("download", `${filename}.csv`);
  link.click();
  link.remove();
};

export default CSVDownload;
