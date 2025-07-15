resource "google_container_cluster" "primary" {
  name               = "devops-showcase-cluster"
  location           = var.zone
  remove_default_node_pool = true
  initial_node_count = 1

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-node-pool"
  location   = var.zone
  cluster    = google_container_cluster.primary.name

  node_config {
    machine_type = "e2-medium"
    preemptible  = false
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  initial_node_count = 3
  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  namespace  = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.46.6"

  create_namespace = true

  values = [
    file("${path.module}/../helm/argocd-values.yaml")
  ]
}
