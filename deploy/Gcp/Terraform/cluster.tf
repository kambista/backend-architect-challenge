resource "google_container_cluster" "my_cluster" {
  name     = "my-cluster"
  location = var.CLOUD_ZONE  # Cambia según tu preferencia
  initial_node_count = 1    # Número inicial de nodos
  network = google_compute_network.deploytemp_vpc_network.name
    subnetwork = google_compute_subnetwork.deploytemp_subnet.name
  node_config {
    machine_type = "n1-standard-1"
  }
}