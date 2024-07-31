import { UninstallGlobalCommands } from '../utils/commandRegister';

console.log('Uninstalling Global Commands...');
UninstallGlobalCommands(process.env.CLIENT_ID);
