/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:   {type: 'string', required: true},
    description: {type: 'string', required: true},
    price: {type: 'number', columnType:'numeric',required:true},
    image_url:{type: 'string', required:true},
  },

};

