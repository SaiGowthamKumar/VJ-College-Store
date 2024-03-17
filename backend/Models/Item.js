const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const ItemSchema = new Schema({
    item:String,
    description:String,
    content:String,
    cover:String
});

const ItemModel = model('Item',ItemSchema);

module.exports = ItemModel;