var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            gift: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Gift",
            },
            qty: {
                type: Number,
                required: true,
            },
        },
      ],
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      

      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
    

}, { timestamps:true })


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;