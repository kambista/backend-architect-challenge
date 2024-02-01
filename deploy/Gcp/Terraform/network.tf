resource "google_compute_network" "deploytemp_vpc_network" {
  name = "deploytemp-vpc-network"
  auto_create_subnetworks = false
  routing_mode = "GLOBAL"
}

resource "google_compute_subnetwork" "deploytemp_subnet" {
    name = "deploytemp-subnet2"
    ip_cidr_range = var.SUBNET_CIDR
    network = google_compute_network.deploytemp_vpc_network.name
    region = var.CLOUD_REGION
}
