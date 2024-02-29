const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, type, price, vendor 
    FROM product_table LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(product){

  const result = await db.query(

    `INSERT INTO product_table 

    (name, type, price, vendor) 

    VALUES 

    ('${product.name}', '${product.type}', ${product.price}, '${product.vendor}')`

  );

  let message = 'Error in creating product';

  if (result.affectedRows) {

    message = 'Product created successfully';

  }

  return {message};

}

async function update(id, product){

  const result = await db.query(

    `UPDATE product_table 

    SET name="${product.name}", type="${product.type}", price=${product.price}, 

    vendor="${product.vendor}"

    WHERE id=${id}` 

  );

  let message = 'Error in updating product';

  if (result.affectedRows) {

    message = 'Product updated successfully';

  }

  return {message};

}

async function remove(id){

  const result = await db.query(

    `DELETE FROM product_table WHERE id=${id}`

  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {

    message = 'Product deleted successfully';

  }

  return {message};

}

module.exports = {

  getMultiple,

  create,

  update,

  remove

}