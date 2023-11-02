import ctrlDecorator from "../decorators/ctrl-decorator.js";
import HttpError from "../helpers/HttpError.js";
import Drop from "../models/drop.js";

const isSiteOwner = async (req, res, next) => {
  
  try {
    const origin = req.get("Origin");

    const nickname = req.body?.nickname;
    if (nickname === "" || !nickname) throw HttpError(401);
    const allArr = await Drop.find({ nickname });
    if (allArr.length !== 1) throw HttpError(401);
    const isOwner = allArr[0].siteList.includes(origin);
    if (!isOwner) throw HttpError(401);
    next();
  } catch (error) {
    throw HttpError(401);
  }

};


export default ctrlDecorator(isSiteOwner)
