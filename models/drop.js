import { Schema, model } from "mongoose";

const dropSchema = new Schema({
  nickname: String,
  chatID: String,
  siteList: Array,
})

const Drop = model("drop", dropSchema)

export default Drop