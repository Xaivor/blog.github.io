const shelljs = require('shelljs');


// shelljs.exec(`npm run docs:build`)
// shelljs.exec(`echo 'Pack is building Success..., is deploying...'`);

shelljs.exec(`cd docs/.vitepress/dist`)
shelljs.exec(`ls`)
shelljs.exec(`git init`)
shelljs.exec(`git add -A`)
shelljs.exec(`git commit -m 'chore:deploy'`)

// shelljs.exec(`git push -f https://github.com/Xaivor/blog.git master:docs`)
// shelljs.exec(`echo 'Deploy Success...'`);