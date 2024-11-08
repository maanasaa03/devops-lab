pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'staging', url: 'https://github.com/your-repo.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose -f docker-compose.yml build'
            }
        }
        stage('Start Services') {
            steps {
                sh 'docker-compose -f docker-compose.yml up -d frontend backend selenium'
            }
        }
        stage('Run Selenium Tests') {
            steps {
                sh 'docker-compose -f docker-compose.yml exec backend node selenium-test.js'
            }
        }
        stage('Collect Test Reports') {
            steps {
                junit '**/test-*.xml' // Adjust if you generate XML reports for tests
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}
