import ctrlDecorator from "../decorators/ctrl-decorator.js";
import HttpError from "../helpers/HttpError.js";
import Drop from "../models/drop.js";

const isSiteOwner = async (req, res, next) => {
  // const host = req.headers.host;
  // console.log('Request is coming from:', host);

  // const clientHost = req.get('host');
  // console.log('Request is coming from:', clientHost);

  // работает только локально
  // const referrer = req.headers.referer;
  // console.log('Request is coming from:', referrer);

  // || req.headers.origin
  try {
    const origin = req.get("Origin");
    console.log("Request is coming from:", typeof origin);

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

  // if (nickname) {
  //   const allArr = await Drop.find({ nickname })
  //   if (allArr.length === 1) {
  //     const allObj = allArr[0]
  //     console.log('allObj', allObj)
  //     if (allObj.siteList.includes(origin)) {
  //       console.log('можно отправлять')
  //       next();
  //     }
  //   }

  // }
};


export default ctrlDecorator(isSiteOwner)
