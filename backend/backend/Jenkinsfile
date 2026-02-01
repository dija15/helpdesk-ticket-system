pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonage du repository GitHub...'
                checkout scm
            }
        }

        stage('Preparation') {
            steps {
                echo 'Le repository est connecté avec succès.'
                echo 'En attente du code backend (Spring Boot).'
            }
        }

        stage('Validation') {
            steps {
                echo 'Pipeline Jenkins fonctionnel.'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès.'
        }
        failure {
            echo '❌ Une erreur est survenue.'
        }
    }
}
