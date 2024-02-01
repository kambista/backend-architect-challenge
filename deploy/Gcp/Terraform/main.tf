terraform {
  required_providers {
    google = {
        source = "hashicorp/google"
        version = "4.79.0"
    }
  }
}

provider "google" {
  credentials = file(var.PATH_CREDENTIALS)

  project = var.PROJECT_ID
  region = var.CLOUD_REGION
  zone = var.CLOUD_ZONE
}
