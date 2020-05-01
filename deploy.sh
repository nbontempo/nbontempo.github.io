hugo -t hugo-paper

cd public
git add .

git commit -m "Modificando o blog"

git push origin master -f

cd ..