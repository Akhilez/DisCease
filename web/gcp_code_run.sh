#!/bin/bash
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

PROJECT_ID="everst-website"
IMAGE_NAME="discease_web"
CLOUD_RUN_SERVICE="discease-web"

gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME:v1 $DIR

gcloud beta run deploy $CLOUD_RUN_SERVICE --image=gcr.io/$PROJECT_ID/$IMAGE_NAME:v1 --allow-unauthenticated --memory=512Mi --timeout=900 --platform managed --set-env-vars=DJANGO_DEBUG=False

# WINDOWS:
# gcloud builds submit --tag gcr.io/everst-website/discease_web:v1 .
# gcloud beta run deploy discease-web --image=gcr.io/everst-website/discease_web:v1 --allow-unauthenticated --memory=512Mi --timeout=900 --platform managed

# Set default region:
# gcloud config set run/region us-east4

# [1] asia-east1
# [2] asia-northeast1
# [3] europe-north1
# [4] europe-west1
# [5] europe-west4
# [6] us-central1
# [7] us-east1
# [8] us-east4
# [9] us-west1
