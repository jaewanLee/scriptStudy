const Sequelize=require("sequelize")
const env=process.env.NODE_ENV||"development"
const config=require("../config/config.json")
const db={};

const sequelize=new Sequelize(
  config.database,confiug.user,config.password,config)


  db.sequelize=sequelize;
  db.Sequelize=Sequelize;
  db.User=require("./user")(sequelize,Sequelize)
  db.Post=require("./post")(sequelize,Sequelize)
  db.Hashtag=require("./hashtag")(sequelize,Sequelize)

  //User db는 postDB의 값 여러개를 참조할 수 있다.
  db.User.hasMany(db.Post)
  //Post DB는 User DB로부터 1:N관계에 있다.
  //sequelize에서 자동으로 postDB에 UserDB에 있는 userID컬럼을 추가해준다.
  db.Post.belongsTo(db.User)
  //Post DB는 PostHashTag와 다중 참조값을 가질 수 있다.
  //다중참조관계에 있는 테이블을 자동으로 만들어주는데 그 참조관계가 담겨있는 db이름이 postHasTag이다.
  //칼럼은 postId와 hashTagId이다.
  //이렇게함으로써 post에서는 getHashtag/addHastag등이 사용가능하다.
  //반대로 hastag에서는 getpost/addposts가 가능하다.
  db.Post.belongsToMany(db.Hashtag,{through:"PostHashTag"})
  db.Hashtag.belongsToMany(db.Post,{through:"PostHashTag"})
  //같은 table내에서의 N:M관계.
  //자기자신이기떄문에 참조키명을 지정해주고, 해당값에는 User의 key값인 userID가 들어간다.
  //as는 join작업시 사용하는 이름으로, getFolower/addFollower가 가능하다.
  //Follow라는 테이블을 생성해서 관계를 저장한다.
  db.User.belongsToMany(db.User,{
    foreinKey:"follwingId",
    as:"Followers",
    through:"Follow"
  })
  //자기자신의 참조값을 나타낸것으로 위와 같지만, followerID라는 컬럼에 들어가는 값들이다.
  //마찬가지로 following를 사용하여 join연산이 가능하다.
  db.User.belongsToMany(db.User,{
    foreinKey:"followerId",
    as:"Followings",
    through:"Follow"
  });

  module.exports=db;