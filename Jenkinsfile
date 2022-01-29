
pipeline {
  agent {
    node { label 'built-in' }
  }
  stages {
    stage('install') {
      steps {
        sh 'node -v'
        sh 'echo $PWD'
        sh 'npm install'
      }
    }
    stage('unit tests') {
      steps {
        sh 'npm test'
      }
    }
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('deploy') {
      steps {
        sh 'rm -rf ${TARGET_DIR}/*'
        sh 'cp -R ${PWD}/build/* ${TARGET_DIR}/'
      }
    }
  }
}