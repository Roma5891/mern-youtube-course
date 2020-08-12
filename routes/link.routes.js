const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    /**Проверяем, если ли уже такая ссылка */
    const existing = await Link.findOne({ from });

    /**если есть, то просто возвращаем ее данные */
    if (existing) {
      return res.json({ link: existing });
    }

    /**Генерируем ссылку  */
    const to = baseUrl + "/t/" + code;
    /** Создаем новую ссылку*/
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    /**Сохраняем новую ссылку */
    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так с созданием" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    /**Получаем все ссылки user по его id. userId мы получаем из middleware auth путем декодирования token из header запроса */
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так с получением всех ссылок" });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так с получение ссылки" });
  }
});

module.exports = router;
