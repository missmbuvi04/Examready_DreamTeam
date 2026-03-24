variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "availability_zone_a" {
  description = "Primary availability zone"
  default     = "us-east-1a"
}

variable "availability_zone_b" {
  description = "Secondary availability zone"
  default     = "us-east-1b"
}

variable "vpc_cidr" {
  description = "VPC CIDR range"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Public subnet CIDR for bastion"
  default     = "10.0.1.0/24"
}

variable "private_subnet_a_cidr" {
  description = "Private subnet A CIDR"
  default     = "10.0.2.0/24"
}

variable "private_subnet_b_cidr" {
  description = "Private subnet B CIDR"
  default     = "10.0.3.0/24"
}

variable "my_ip" {
  description = "41.173.194.167/32"
}

variable "app_port" {
  description = "Application port reachable from bastion inside VPC"
  default     = 5000
}

variable "db_port" {
  description = "MySQL port"
  default     = 3306
}

variable "key_name" {
  description = "AWS Key Pair name"
}

variable "public_key_path" {
  description = "Path to your public key file"
}

variable "db_name" {
  description = "Initial database name"
}

variable "db_user" {
  description = "Database username"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}