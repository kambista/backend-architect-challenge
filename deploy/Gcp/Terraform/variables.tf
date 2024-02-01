variable "PROJECT_ID" {
    description = "Project id"
    default = "ace-rider-182920"
}
variable "PATH_CREDENTIALS" {
    description = "Ruta de las credenciales"
    default = "credenciales_gcp.json"
}
variable "CLOUD_REGION" {
    description = "Region"
    default = "us-central1"
}
variable "CLOUD_ZONE" {
    description = "Zona"
    default = "us-central1-b"
}
variable "SUBNET_CIDR" {
    description = "Cidr subnet"
    default = "10.10.11.0/24"
}