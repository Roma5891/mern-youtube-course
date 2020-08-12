const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    /**Получаем ссылку по коду */
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      /**Увеличиваем количество кликов по ссылке и сохраняем */
      link.clicks++;
      await link.save();
      /**Осуществялем редирект на ссылку указанную в базе */
      return res.redirect(link.from);
    }
    res.status(404).json({ message: "Ссылка не найдена" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так с редиректом ссылки" });
  }
});

module.exports = router;
