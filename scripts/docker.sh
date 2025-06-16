# Fonction pour vérifier si le fichier .env.local existe
check_env_file() {
    if [ ! -f "../client/.env.local" ]; then
        echo "Erreur : Le fichier .env.local est introuvable dans ../client/.env.local"
        exit 1
    fi
}

# Fonction pour démarrer les conteneurs Docker
build() {
    check_env_file
    source ../client/.env.local
    echo "Building Docker images..."
    docker-compose --env-file ../client/.env.local build --progress=plain

    echo "Starting containers in detached mode..."
    docker-compose --env-file ../client/.env.local up -d

    echo "Docker build complete and containers are running in background."
}

# Fonction pour arrêter et supprimer les conteneurs Docker
down() {
    check_env_file
    source ../client/.env.local
    docker-compose --env-file ../client/.env.local stop
    echo "Docker containers stopped successfully."
}

# Fonction pour supprimer les conteneurs, images, volumes et orphelins Docker
remove() {
    check_env_file
    source ../client/.env.local
    docker-compose --env-file ../client/.env.local down --rmi all --volumes --remove-orphans
    echo "Docker containers, images, volumes, and orphan containers removed successfully."
}

# Vérification du premier paramètre
case "$1" in
    build)
        build
        ;;
    down)
        down
        ;;
    remove)
        remove
        ;;
    *)
        echo "Usage: bash docker.sh {build|down|remove}"
        exit 1
        ;;
esac
