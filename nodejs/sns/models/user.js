// module.exports=(sequelize,DataType)=>{
//     //넘겨받는 파라미터중 첫번째는 서버에서 운영주잉 db를 관리하는 sequlize객체
//     //DataType sequelize 객체 정의부
//     //그래서 seqeulize를 사용하여 행동,값들을 정의하고
//     //정의부에서 사용될 type등은 DataType을 사용한다.
//     sequelize.define("user",{
//         email:{
//             type:DataType.STRING(40),
//             allowNull:false,
//             unique:true,
//         },
//         nick:{
//             type:DataType.STRING(15),
//             allowNull:false,
//         },
//         passowrd:{
//             type:DataType.STRING(100),
//             allowNull:true,
//         },
//         provider:{
//             type:DataType.STRING(10),
//             allowNull:false,
//             defaultValue:"local"
//         },
//         snsId:{
//             type:DataType.STRING(30),
//             allowNull:true,
//         },
//     },{
//         //timestamp가 true이면 createAt과 updateAT이 추가된다.
//         timestamps:true,
//         //paranoid가 true이면 deleteAt컬러이 추가된다.
//         //이경우 db를 삭제해도 실제 삭제되지 않고 삭제된 날짜가 보여진다.
//         //쿼리에서도 삭제된날자에 값이 있다면 쿼리결과로 return하지 않는다.
//         paranoid:true,
//     })
// }

module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
  