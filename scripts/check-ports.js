#!/usr/bin/env node

/**
 * Скрипт для проверки доступности портов перед запуском серверов
 */

import net from 'net';

const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
};

const ports = [
  { name: 'Backend (3000)', port: 3000 },
  { name: 'Frontend (5173)', port: 5173 },
];

async function checkAllPorts() {
  console.log('Проверка доступности портов...\n');

  let allAvailable = true;

  for (const { name, port } of ports) {
    const available = await checkPort(port);
    if (available) {
      console.log(`✓ ${name} - порт свободен`);
    } else {
      console.log(`✗ ${name} - порт занят!`);
      allAvailable = false;
    }
  }

  if (!allAvailable) {
    console.log('\n⚠ Внимание: некоторые порты заняты. Убедитесь, что старые процессы остановлены.');
    console.log('Для остановки процессов на портах используйте:');
    console.log('  lsof -ti:3000 | xargs kill -9  # для backend');
    console.log('  lsof -ti:5173 | xargs kill -9  # для frontend');
    process.exit(1);
  } else {
    console.log('\n✓ Все порты свободны. Можно запускать серверы.');
    process.exit(0);
  }
}

checkAllPorts();

