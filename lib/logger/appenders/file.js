import fs from "fs";

function fileAppender(content, fileName){
  fs.appendFile(fileName, `\n${JSON.stringify(content)}`, err => {
    if (err) {
      console.error(err);
    }
  });
}

export default {fileAppender}