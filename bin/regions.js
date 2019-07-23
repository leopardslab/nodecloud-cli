const aws = [
  "us-east-2",
  "us-east-1",
  "us-west-1",
  "us-west-2",
  "ap-east-1",
  "ap-south-1",
  "ap-northeast-3"
];

const gcp = [
  "us-west1",
  "us-west2",
  "us-central1",
  "us-east1",
  "us-east4",
  "europe-west3",
  "asia-south1"
];

const azure = [
  "eastasia",
  "southeastasia",
  "centralus",
  "eastus",
  "eastus2",
  "westus"
];

const getRegion = provider => {
  console.log(provider);

  if (provider == "AWS") {
    return aws;
  } else if (provider == "Azure") {
    return azure;
  } else if (provider == "GCP") {
    return gcp;
  } else {
    return aws;
  }
};

module.exports = { getRegion: getRegion };
