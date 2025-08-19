#!/bin/bash

git init
git add *
git commit -m "feat: first commit"
git branch -M main
git remote add origin https://github.com/trdkhardani/project1-express-backend.git
git push -u origin main