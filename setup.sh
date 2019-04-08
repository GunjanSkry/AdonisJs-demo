# Creates S3 bucket in localstack
aws --endpoint-url=http://localhost:4572 s3api create-bucket --bucket mytestbucket --region us-east-1 --acl public-read-write
# Lists all bucket of s3
aws --endpoint-url=http://localhost:4572 s3 ls

# Creates SQS Quese named user and todo
aws --endpoint-url=http://localhost:4576 sqs --region us-east-1 create-queue --queue-name user
aws --endpoint-url=http://localhost:4576 sqs --region us-east-1 create-queue --queue-name todo
