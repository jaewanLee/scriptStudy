const path=require("path")
const Sequelize=require("sequelize")

const env=process.env.NODE_NEV || "development"
// console.log(require(path.join(__dirname,"..","config","config.json")))
// console.log(process.env.NODE_NEV || "development")
const config=require(path.join(__dirname,"..","config","config.json"))[env]
const db={};

//sequlieze객체를 설정값과 함께 초기화시킨 객체
const sequelize=new Sequelize(config.database,config.username,config.password,config);

//초기화값이 들어간 sequelize객체
db.sequelize=sequelize;
//sequelize module자체
db.Sequelize=Sequelize;

db.User=require("./user")(sequelize,Sequelize)
db.Comment=require("./commnet")(sequelize,Sequelize)

db.User.hasMany(db.Comment,{foreignKey:"commenter",sourceKey:"id"});
db.Comment.belongsTo(db.User,{foreignKey:"commenter",sourceKey:"id"});

module.exports=db;