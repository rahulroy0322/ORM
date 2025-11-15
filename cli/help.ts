import chalk from 'chalk';
import pkg from '../package.json';

const help = () => {
  console.log(`
 ${chalk.cyan('<orm>')} : ${chalk.magenta(pkg.version)}
📋 orm - Available Commands:
        
  help         | Show help message
  db:migration | Generate migration for Models
`);
};
//   project ts|js Setup a new project
// 💡 Examples:
// setup project ts first-project  #creates new project called first-project
// setup project ts #ask for project name

export { help };
