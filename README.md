<!-- <p align="center">
  <img src="./client/src/assets/images/logos/compass-logo.svg" alt="Compass Logo" width="600">
</p> -->

# Introduction

Diagnosis is a Business Plan & Project Tracking SaaS.

## Table of Contents

- [Overview](#overview)
- [Stack](#stack)
- [System Requirements](#system-requirements)
- [Getting Started](#getting-started)
- [Support](#support)

## Overview

Diagnosis is a powerful and user-friendly IT Assessment Tool designed to help you assess, track, and improve your IT infrastructure with comprehensive evaluations and progress tracking. This tool will be your go-to solution for managing IT assessments efficiently and effectively.

## Stack

Diagnosis is built using the following technologies:

- **MongoDB:** A NoSQL database used to store project and user data.
- **Nextjs:** A React framework for server-side rendering and static site generation.
- **React:** A JavaScript library for building user interfaces, used for the frontend.
- **Docker:** A platform for automating the deployment of applications inside lightweight, portable containers.
- **TypeScript:** A typed superset of JavaScript.
- **Tailwind CSS:** A utility-first CSS framework.
- **Shadcn-ui:** A component library for modern UI.
- **Zod:** A Schema validation library.
- **React Hook Form:** For handling forms efficiently.
- **Husky:** For pre-commit hooks.


## System Requirements

- **OS:** Linux (MacOS or Ubuntu).
- **RAM:** At least 8GB.
- **Storage:** At least 256GB.

## Getting Started

- Download and Install `Docker Desktop` from https://www.docker.com/products/docker-desktop/
- In the root directory of your client folder, create a file named .env.local.
      - Put the following configuration:
        ```
        # Auth
        AUTH_URL=http://localhost:3000
        AUTH_SECRET=
        NODE_ENV=development

        # Set to true to bypass authentication for development
        BYPASS_AUTH=true

        AUTH_GITHUB_ID=
        AUTH_GITHUB_SECRET=

        # GitHub OAuth configuration
        AUTH_GITHUB_ID=
        AUTH_GITHUB_SECRET=
        
        ```
    
        

- Make sure you're in the `/scripts/` directory.
- Run `bash docker.sh build`.
- Go to [localhost:3000](http://localhost:3000).

- Stop Docker containers run `bash docker.sh down`
- Remove Docker containers, images, volumes, and orphan containers `bash docker.sh remove`

### SSL Certificates Setup (Required)

## Logs


## Support

Feel free to ask any questions in the **#Diagnosis** room on Slack.
