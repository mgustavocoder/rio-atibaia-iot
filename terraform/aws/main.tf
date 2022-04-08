module "ecs-scheduled-job" {
  source              = "git::git@github.com:mgustavocoder/terraform.git//aws/ecs-scheduled"
  application         = "rio-atibaia-iot"
  schedule_expression = "rate(3 hours)"
  vpc_id              = "vpc-05025076171fc08cc"
}
