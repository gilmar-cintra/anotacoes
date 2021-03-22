import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import sequelizeConfig from "../../../config/sequelize.js";
import { User } from "./User";
import { Field } from "./Field";
import { FieldType } from "./FieldType";
import { Skills } from "./Skills";
import { SkillLevel } from "./SkillLevel";
import { Email } from "./Email";
import { EmailType } from "./EmailType";
import { Phone } from "./Phone";
import { PhoneType } from "./PhoneType";
import { Network } from "./Network";
import { NetworkType } from "./NetworkType";
import { Language } from "./Language";
import { LanguageLevel } from "./LanguageLevel";
import { Vacancy } from "./Vacancy";
import { Address } from "./Address";
import { Goal } from "./Goal";

// DB stuff
const { NODE_ENV = "development" } = process.env;
const sequelizeOptions: SequelizeOptions = sequelizeConfig[NODE_ENV];
const sequelize = new Sequelize(sequelizeOptions);
const models = [User, Field, FieldType, Email, EmailType, Skills, SkillLevel, Phone, PhoneType, Network, NetworkType, Language, LanguageLevel, Vacancy, Address, Goal];
sequelize.addModels(models);
// loga no banco
sequelize
  .authenticate()
  .then(() => {
    if (NODE_ENV !== "test") {
      // eslint-disable-next-line no-console
      console.log("Connection has been established successfully.");
    }
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Unable to connect to the database:", err);
  });
export default sequelize;
