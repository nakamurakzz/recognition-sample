import { DetectTextCommand } from "@aws-sdk/client-rekognition";
import fs from "fs";
import "dotenv/config";
import { AWSClients } from "./lib/awsClients";

const bucketName = process.env.BUCKET;
const firstDirectory = "detect-text/";

const main = async (fileName: string) => {
  const aws = new AWSClients();

  try {
    // S3のファイルを使用する場合
    // const params: DetectTextCommandInput = {
    //   Image: {
    //     S3Object: {
    //       Bucket: bucketName,
    //       Name: firstDirectory + fileName,
    //     },
    //   },
    // };

    const params = {
      Image: {
        Bytes: fs.readFileSync(`./${fileName}`),
      },
    };
    const data = await aws.rekognitionClient.send(
      new DetectTextCommand(params)
    );

    // ラベル表示
    console.table(
      data.TextDetections?.map((text) => {
        return {
          Type: text.Type,
          DetectedText: text.DetectedText,
          Confidence: text.Confidence,
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
