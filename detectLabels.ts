import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition"
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import 'dotenv/config'

const bucketName = process.env.BUCKET;
const firstDirectory = "detect-label/";

const main = async (fileName:string) => {
  const commonParam = { region: "ap-northeast-1" }
  const s3Client = new S3Client(commonParam);

  try{
    const fileBuffer = fs.readFileSync(`./${fileName}`);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: firstDirectory + fileName,
        Body: fileBuffer,
      })
    );  
  }catch(err){
    console.error(err);
    return;
  }

  const rekognitionClient = new RekognitionClient(commonParam);
  const params = {
    Image: {
    S3Object: {
      Bucket: bucketName, 
      Name: firstDirectory + fileName
    }
    }, 
    MaxLabels: 5, 
    MinConfidence: 70
  };

  try{
    const command = new DetectLabelsCommand(params);
    const data = await rekognitionClient.send(command);  
    
    // ラベル表示
    console.log(data.Labels);
  }catch(err){
    console.error(err)
    return
  }

  return;
}

if (process.argv[2]==undefined) throw new Error("Please specify a file name");
main(process.argv[2])
