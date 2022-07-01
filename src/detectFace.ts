import { DetectFacesCommand } from "@aws-sdk/client-rekognition";
import fs from "fs";
import "dotenv/config";
import { AWSClients } from "./lib/awsClients";

const main = async (fileName: string) => {
  const aws = new AWSClients();

  try {
    const params = {
      Image: {
        Bytes: fs.readFileSync(`./${fileName}`),
      },
      Attributes: ["ALL"],
    };
    const data = await aws.rekognitionClient.send(
      new DetectFacesCommand(params)
    );
    // レスポンス
    console.log(data);

    if (data.FaceDetails == null) {
      console.log("No faces detected");
      return;
    }

    // ラベル表示
    console.table(
      data.FaceDetails[0].Emotions?.map((emotion) => {
        return {
          Emotion: emotion.Type,
          Confidence: emotion.Confidence,
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
