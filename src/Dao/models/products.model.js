import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: String, 
    status: {
      type: Boolean,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      default: "admin",
    },
});

productSchema.plugin(mongoosePaginate);

const productModel = model("product", productSchema);

export { productModel };