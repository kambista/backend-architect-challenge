resource "google_compute_firewall" "deploytemp_firewall_http" {
  name = "deploytemp-firewall-http"
  network = google_compute_network.deploytemp_vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["80"]
  }

  source_ranges = [ "0.0.0.0/0" ]
  target_tags = ["http"]
}

resource "google_compute_firewall" "deploytemp_firewall_ssh" {
  name = "deploytemp-firewall-ssh"
  network = google_compute_network.deploytemp_vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["22"]
  }

  source_ranges = [ "0.0.0.0/0" ]
  target_tags = ["ssh"]
}

resource "google_compute_firewall" "deploytemp_firewall_https" {
  name = "deploytemp-firewall-https"
  network = google_compute_network.deploytemp_vpc_network.name
  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = [ "0.0.0.0/0" ]
  target_tags = ["https"]
}