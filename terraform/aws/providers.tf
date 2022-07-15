terraform {
  required_version = ">= 0.12"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.8.0"
    }
  }
  backend "s3" {
    bucket                  = "awsmgustavo-terraform-state-storage"
    key                     = "rio-atibaia-iot"
    region                  = "us-east-1"
    encrypt                 = true
  }
}
