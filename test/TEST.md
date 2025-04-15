Testing
GET: curl http://localhost:3000/api/products?page=2&limit=5
PUT: curl -X PUT http://localhost:3000/api/products/bulk?page=1&limit=2 -d '[{"id":"prod1","stock":50},{"id":"prod2","stock":100}]' -H "Content-Type: application/json"
DELETE: curl -X DELETE http://localhost:3000/api/products/bulk?page=1&limit=2 -d '["prod1","prod2"]' -H "Content-Type: application/json"
POST: curl -X POST http://localhost:3000/api/products/bulk?page=1&limit=2 -d '[{"name":"Keyboard","price":59.99,"stock":100},{"name":"Mouse","price":29.99,"stock":200}]' -H "Content-Type: application/json"
Use npm run dev and Postman for local testing.
