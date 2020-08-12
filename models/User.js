const { Schema, model, Types } = require("mongoose");

/**Настраиваем модель пользователя */
const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  } /**Почта: String,обязательное, уникальное */,
  password: { type: String, required: true } /**Пароль: String,обязательное */,
  links: [
    { type: Types.ObjectId, ref: "Link" },
  ] /**Ссылки: ObjectId,привязываем к модели ссылок Link */,
});

module.exports = model("User", schema);
