echo "version : $1"
git add .
git commit -m "$1"
git push
git remote add origin https://github.com/Adhil80/football-api.git