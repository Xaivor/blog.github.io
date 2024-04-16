const shelljs = require('shelljs');


shelljs.exec(`npm run docs:build`)
shelljs.exec(`echo 'Pack is building Success..., is deploying...'`);

shelljs.exec(`cd docs/.vitepress/dist`)
shelljs.exec(`cd docs/.vitepress/dist && git init && git add -A && git commit -m 'chore:deploy' && git push -f https://github.com/Xaivor/blog.git master:docs`)

shelljs.exec(`echo 'Deploy Docs Success...'`);

shelljs.exec(`git init && git add -A && git commit -m 'chore:deploy' && git push -f https://github.com/Xaivor/blog.git master`)

shelljs.exec(`echo 'Deploy Program Success...'`);