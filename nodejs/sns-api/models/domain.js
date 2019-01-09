module.exports=(sequelize,DataType)=>(
    sequelize.define("domain",{
        host:{
            type:DataType.STRING(80),
            allowNull:false
        },
        type:{
            type:DataType.STRING(10),
            allowNull:false,
        },
        clientSecret:{
            type:DataType.STRING(40),
            allowNull:false
        }
    },{
        //validate는 db에 data를 검증하는 기능으로, 데이터가 생성되거나 업데이터되는 등 행동을할떄마다 실행함
        validate:{
            //unknownType이라는 이름의 vaWlidate생성
            unknownType(){
                //db에서 type이라는 컬럼이 반드시 free 이거나 premium이어야함
                console.log(this.type,this.type!=="free",this.type!=="premium");
                if(this.type!=="free"&&this.type!=="premium"){
                 throw new Error("type comlum must be premium or free")   
                }
            }
        },
        timestamps:true,
        paranoid : true
    })
)