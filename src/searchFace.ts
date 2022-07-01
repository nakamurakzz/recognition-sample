import {
  CreateCollectionCommand,
  CreateCollectionCommandInput,
  DeleteCollectionCommand,
  DeleteCollectionCommandInput,
  IndexFacesCommand,
  IndexFacesCommandInput,
  SearchFacesByImageCommand,
  SearchFacesByImageCommandInput,
} from "@aws-sdk/client-rekognition";
import fs from "fs";
import "dotenv/config";
import { AWSClients } from "./lib/awsClients";

const main = async (targetFile: string, fileNameArray: string[]) => {
  const aws = new AWSClients();
  const collectionId = "collection-001";

  try {
    // コレクションの作成
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rekognition/interfaces/createcollectioncommandinput.html
    const createCollectionParams: CreateCollectionCommandInput = {
      CollectionId: collectionId,
    };
    await aws.rekognitionClient.send(
      new CreateCollectionCommand(createCollectionParams)
    );

    // 顔リストの作成
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rekognition/classes/indexfacescommand.html
    // MaxFaces で検出する顔の数を指定する
    await Promise.all(
      fileNameArray.map(async (fileName) => {
        const createListParams: IndexFacesCommandInput = {
          CollectionId: collectionId,
          Image: {
            Bytes: fs.readFileSync(`./${fileName}`),
          },
          MaxFaces: 12,
        };
        const list = await aws.rekognitionClient.send(
          new IndexFacesCommand(createListParams)
        );
        console.log("-----------------------------------------------------");
        console.log("顔リスト作成");
        list.FaceRecords &&
          list.FaceRecords.map((record, index) => {
            console.log(`${index + 1}人目`);
            console.log(record.Face);
          });
        console.log("-----------------------------------------------------");
      })
    );

    // 作成したリストから検索する
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rekognition/interfaces/searchfacesbyimagecommandinput.html
    const searchParams: SearchFacesByImageCommandInput = {
      CollectionId: collectionId,
      Image: {
        Bytes: fs.readFileSync(`./${targetFile}`),
      },
    };

    const data = await aws.rekognitionClient.send(
      new SearchFacesByImageCommand(searchParams)
    );

    console.log("-----------------------------------------------------");
    console.log("照合結果");
    console.log(data.FaceMatches && data.FaceMatches[0].Face);
    console.log("-----------------------------------------------------");
  } catch (err) {
    console.error(err);
  } finally {
    // コレクションの削除
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-rekognition/classes/deletecollectioncommand.html
    const deleteCollectionParams: DeleteCollectionCommandInput = {
      CollectionId: collectionId,
    };
    await aws.rekognitionClient.send(
      new DeleteCollectionCommand(deleteCollectionParams)
    );
  }
  return;
};

if (process.argv[2] == undefined || process.argv[3] == undefined)
  throw new Error("Please specify a file name");
main(process.argv[2], process.argv.splice(3));
