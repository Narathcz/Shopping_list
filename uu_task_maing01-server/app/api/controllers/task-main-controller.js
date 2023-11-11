"use strict";
const TaskMainAbl = require("../../abl/task-main-abl.js");

class TaskMainController {
  init(ucEnv) {
    return TaskMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return TaskMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return TaskMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new TaskMainController();
