const { Sails } = require("sails");
const sailsHookOrm = require("sails-hook-orm");

module.exports = {


  friendlyName: 'Create',


  description: 'Create orders.',


  inputs: {
      products: {
        type:'ref'
      },
      total_price: {
        type:'number'
      },
      customer_id: {
        type:'number'
      }

  },


  exits: {
    success: {
      statusCode: 201,
      message: 'successfully create order',
    },

    bad_request: {
      statusCode:400,
      message: 'something wrong with request params'
    }
  },


  fn: async function (inputs, exits) {
  
    // check request params
    if(inputs.products == null ) {
      return exits.bad_request({
        success: false,
        message: 'products cant be empty'})
    } else if(inputs.customer_id == '') {
      return exits.bad_request({
        success: false,
        message: 'customer_id cannot be empty'})
    }

    var products = await Product.find({where:{id:inputs.products}})
    let actual_price = 0 
    products.forEach( product => {
        actual_price +=  product.price
    });


    //validate total price 
    if(actual_price != inputs.total_price ) {
      return exits.bad_request({
        success: false,
        message: 'total price not match'})
    }
    
    //validate customer
    var customer = await Customer.findOne({
      where : {id:inputs.customer_id}
    })

    if(customer == null) {
      return exits.bad_request({
        success: false,
        message: 'customer not exist'})
    }


      await Orders.getDatastore().transaction(async (db)=>{

     var order = await Orders.create({
        total_price: actual_price
      }).fetch().usingConnection(db)


      
      if(!order) {
        return exits.bad_request({
          success: false,
      message: 'failed'})
      }
    
    var dataItems = []
    await  products.forEach( product => {
        dataItems.push({order_id:order.id, product_id:product.id})
      })
      await Items.createEach(dataItems).usingConnection(db)
    })

    
    return exits.success({
      success: true,
      message: 'successfully create order'})

  }


};
