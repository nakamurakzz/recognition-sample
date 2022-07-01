import { DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import fs from "fs";
import "dotenv/config";
import { AWSClients } from "./lib/awsClients";

const bucketName = process.env.BUCKET;
const firstDirectory = "detect-label/";

const main = async (fileName: string) => {
  const aws = new AWSClients();

  // S3のファイルを使用する場合
  const params = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: firstDirectory + fileName,
      },
    },
    MaxLabels: 5,
    MinConfidence: 70,
  };

  // ローカルのファイルを使用する場合
  // const params = {
  //   Image: {
  //     Bytes: fs.readFileSync(`./${fileName}`),
  //   },
  // };

  try {
    const data = await aws.rekognitionClient.send(
      new DetectLabelsCommand(params)
    );

    // ラベル表示
    console.table(
      data.Labels?.map((label) => {
        return {
          Name: label.Name,
          Confidence: label.Confidence,
        };
      })
    );
  } catch (err) {
    console.error(err);
    return;
  }

  return;
};

if (process.argv[2] == undefined) throw new Error("Please specify a file name");
main(process.argv[2]);
