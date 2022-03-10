import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  const productId = Math.floor(Math.random() * 10000);
  http.get(`http://localhost:3001/reviews?product_id=${productId}`);
  sleep(1);
}
