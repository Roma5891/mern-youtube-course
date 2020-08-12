const { Schema, model, Types } = require("mongoose");

/**Настраиваем модель пользователя */
const schema = new Schema({
  from: {
    type: String,
    required: true,
  } /**Откуда: String,обязательное */,
  to: {
    type: String,
    required: true,
    unique: true,
  } /**Куда: String,обязательное, уникальное */,
  code: {
    type: String,
    require: true,
    unique: true,
  } /**Код ссылки: String, обязательное, уникальное */,
  date: {
    type: Date,
    default: Date.now,
  } /**Дата создания, Data и передаю Date.now, не вызывая (как ссылку) */,
  clicks: { type: Number, default: 0 } /**Количество кликов */,
  owner: {
    type: Types.ObjectId,
    ref: "User",
  } /**Владелец, ObjectId,привязываем к модели пользователя User */,
});

module.exports = model("Link", schema);
