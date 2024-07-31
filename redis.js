// redis.js
import Redis from 'ioredis';

// Redis istemcisini oluştur
const redis = new Redis({
  host: 'localhost', // Redis sunucusunun adresi
  port: 6379, // Redis sunucusunun portu
});

export default redis;
