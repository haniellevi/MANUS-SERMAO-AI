require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

try {
  console.log('Aplicando schema ao banco de dados...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('Schema aplicado com sucesso!');
} catch (error) {
  console.error('Erro ao aplicar schema:', error.message);
}

