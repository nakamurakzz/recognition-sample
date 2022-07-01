import { RekognitionClient } from "@aws-sdk/client-rekognition";
import { S3Client } from "@aws-sdk/client-s3";

export class AWSClients {
  s3Client: S3Client;
  rekognitionClient: RekognitionClient;

  constructor() {
    this.s3Client = new S3Client({ region: "ap-northeast-1" });
    this.rekognitionClient = new RekognitionClient({
      region: "ap-northeast-1",
    });
  }
}
