# nodecloud-cli

NodeCloud-cli is an unified command line interface for open cloud based on [NodeCloud](<[https://github.com/cloudlibz/nodecloud-cli](https://github.com/cloudlibz/nodecloud-cli)>). NodeCloud-cli supports cloud providers like AWS, Azure, GCP and many more.

## 🚀 Install

Using npm

```
$ npm install -g nodecloud-cli
```

Using yarn

```
$ yarn global add nodecloud-cli
```

## 📣 Usage

Initialize cli with selected cloud provider

```
$ nc --init
```

**Compute** :computer:

Create virtual machine instance

```
$ nc --compute create --type aws --vm-name="aws-ec2"
```

List all available virtual machine instance

```
$ nc --compute list --type aws
```

Delete selected virtual machine instance

```
$ nc --compute delete --type aws --in-id="Instance_ID"
```

Turn on virtual machine instance

```
$ nc --compute start --type aws --in-id="Instance_ID"
```

Shut down virtual machine instance

```
$ nc --compute stop --type aws --in-id="Instance_ID"
```

Reboot virtual machine instance

```
$ nc --compute reboot --type aws --in-id="Instance_ID"
```

**Network** :satellite:

Creating load balancer

```
$ nc --network create --type="aws" --service="lb" --name="myelb" --port="80"
```

Deleting load balancer

```
$ nc --network delete --type="aws" --service="lb" --name="myelb"
```

List load balancer

```
$ nc --network list --type="aws" --service="lb"
```

Add tag to load balancer

```
$ nc --network tag --type="aws" --service="lb" --name="myelb" --key="Lv" --value="one"
```

Remove tag from load balancer

```
$ nc --network detag --type="aws" --service="lb" --name="myelb" --key="Lv"
```

**Storage** :floppy_disk:

Creating Storage bucket

```
$ nc --storage create --type aws  --st-name="aws-ec2"
```

Deleting Storage bucket

```
$ nc --storage delete --type aws  --st-name="Instance_ID"
```

List all Storage buckets

```
$ nc --storage list --type aws
```

Upload to Storage bucket

```
$ nc --storage upload --type aws  --st-name="Instance_ID" --file="file_path"
```

**Identity Access Management** :key:

Creating Group

```
$ nc --iam create --type aws  --gp-name="UserGroup01"
```

Deleting Group

```
$ nc --iam delete --type aws  --gp-name="UserGroup01"
```

Attach Resource

```
$ nc --iam attach --type aws  --gp-name`="UserGroup01"` --ar-name="resource01"
```

Detach Resource

```
$ nc --iam detach --type aws  --gp-name`="UserGroup01"` --ar-name="resource01"
```

## 💻 Development setup

```
$ git clone https://github.com/cloudlibz/nodecloud-cli
$ cd nodecloud-cli
$ yarn install
```

## ✒️ Run unit tests

```
$ yarn test
```

## 📜 License

MIT
