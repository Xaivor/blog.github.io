const shelljs = require('shelljs');


shelljs.exec(`npm run docs:build`)
shelljs.exec(`echo '打包完成，正在发布'`);

shelljs.exec(`cd docs/.vuepress/dist`)
shelljs.exec(`git init`)
shelljs.exec(`git add -A`)
shelljs.exec(`git commit -m 'deploy'`)

shelljs.exec(`git push -f https://github.com:Xaivor/blog.git master:gh-pages`)
shelljs.exec(`echo '发布完成，SUCCESS'`);