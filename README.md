# pms_be
simple product management system with sails js



## How to run 

Make sure you have mysql install in your device 
create Database 'pms' for example


install npm

install sailsjs more info on 
https://sailsjs.com/get-started

clone this repo\
run sails lift



## product

### get all
GET /product
### get one
GET /product/{id}
### insert 
POST /product\

{
  "name":"Any string",
  "description":"any string",
  "price": 1000,
  "image_url":"any string"
}
### delete
DELETE /product


## Customer

### get all
GET /customer
### get one
GET /customer/{id}
### insert 
POST /customer\

{
  "name": "any"
}

### delete
DELETE /customer

## Orders
### create
POST /orders\

{
  "products": [{id product},{id product}],
  "total_price": 70000,
  "cutomer_id" {customer id}
}






