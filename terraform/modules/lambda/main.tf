locals {
  name = "${var.service_name}_${var.env}_${var.name}"
}

data "archive_file" "this" {
  type        = "zip"
  source_dir  = "../dist/handlers/${var.name}/"
  output_path = "../dist/pkg/${var.name}.zip"
}

data "aws_iam_policy_document" "role" {
  statement {
    sid     = "AllowLambda"
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "this" {
  name               = "${local.name}_role"
  assume_role_policy = data.aws_iam_policy_document.role.json
}

data "aws_iam_policy_document" "permissions" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_policy" "this" {
  name   = "${local.name}_permissions"
  policy = data.aws_iam_policy_document.permissions.json
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this.arn
}

resource "aws_cloudwatch_log_group" "this" {
  name              = "/aws/lambda/${local.name}"
  retention_in_days = 7
}

resource "aws_lambda_function" "this" {
  function_name    = local.name
  handler          = "handler.handler"
  runtime          = "nodejs22.x"
  architectures    = ["arm64"]
  filename         = data.archive_file.this.output_path
  role             = aws_iam_role.this.arn
  memory_size      = 1024
  source_code_hash = filebase64sha256(data.archive_file.this.output_path)
  environment {
    variables = {
      POWERTOOLS_SERVICE_NAME       = var.service_name
      POWERTOOLS_LOGGER_SAMPLE_RATE = "0.1"
      POWERTOOLS_LOG_LEVEL          = "WARN"
    }
  }
  depends_on = [
    aws_iam_role_policy_attachment.this,
    aws_cloudwatch_log_group.this,
  ]
}

