import {
  DetectTextCommand,
  DetectTextCommandInput,
} from "@aws-sdk/client-rekognition";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import "dotenv/config";
import { AWSClients } from "./lib/awsClients";

const bucketName = process.env.BUCKET;
const firstDirectory = "detect-text/";

const main = async (fileName: string) => {
  const aws = new AWSClients();

  try {
    const fileBuffer = fs.readFileSync(`./${fileName}`);
    await aws.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: firstDirectory + fileName,
        Body: fileBuffer,
      })
    );
  } catch (err) {
    console.error(err);
    return;
  }

  const params: DetectTextCommandInput = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: firstDirectory + fileName,
      },
    },
  };

  try {
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
