import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 3000,
  duration: '30s',
};

export default function () {
  const productId = Math.floor(Math.random() * 1000011);
  http.get(`http://localhost:3001/reviews?product_id=${productId}`);
  sleep(1);
}
