module.exports=(sequelize,DataType)=>{
    sequelize.define("user",{
        email:{
            type:DataType.STRING(40),
            allowNull:false,
            unique:true,
        },
        nick:{
            tpye:DataType.STRING(15),
            allowNull:false,
        },
        passowrd:{
            tpye:DataType.STRING(100),
            allowNull:true,
        },
        provider:{
            type:DataType.STRING(10),
            allowNull:false,
            defaultValue:"local"
        },
        snsId:{
            type:DataType.STRING(30),
            allowNull:true,
        },
    },{
        //timestamp가 true이면 createAt과 updateAT이 추가된다.
        timestamps:true,
        //paranoid가 true이면 deleteAt컬러이 추가된다.
        //이경우 db를 삭제해도 실제 삭제되지 않고 삭제된 날짜가 보여진다.
        //쿼리에서도 삭제된날자에 값이 있다면 쿼리결과로 return하지 않는다.
        paranoid:true,
    })
}