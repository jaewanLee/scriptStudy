function getUser(){
    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
        if(xhr.status==200){
            var users=JSON.parse(xhr.responseText);
            var list=document.getElementById("list")
            list.innerHTML="";
            Object.keys(users).map(function(key){
                var userDiv=document.createElement('div')
                var span=document.createElement("span")
                span.textContent=users[key]
                var edit=document.createElement("button")
                edit.textContent="edit"
                edit.addEventListener("click",function(){
                    var name=prompt("enter new name")
                    if(!name){
                        return alert("you must enter name")
                    }
                    var xhr=new XMLHttpRequest();
                    xhr.onload=function(){
                        if(xhr.status==200){
                            console.log(xhr.responseText);
                            getUser();
                        }else{
                            console.error(xhr.responseText)
                        }
                    };
                    xhr.open("PUT",'/users/'+key);
                    xhr.setRequestHeader("Content-Type","application/json");
                    xhr.send(JSON.stringify({name : name}))
                });
                var remove=document.createElement("button")
                remove.textContent="delete"
                remove.addEventListener("click",function(){
                    var xhr=new XMLHttpRequest();
                    xhr.onload=function(){
                        if(xhr.response==200){
                            console.log(xhr.responseText)
                            getUser()
                        }
                        else{
                            console.error(xhr.responseText)
                        }
                    }
                    xhr.open("DELETE","/users/"+key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit)
                userDiv.appendChild(remove)
                list.appendChild(userDiv)
            });
        }
        else{
            console.log(xhr.responseText)
        }
    }
    xhr.open("GET","/users")
    xhr.send()
}
window.onload=getUser;//onload를 활용하여 해당 페이지가 모두 load된뒤에 getUser를 호출함

document.getElementById("form").addEventListener("submit",function(e){
    //기존의 submit이벤트 취소
    e.preventDefault();
    var name=e.target.username.value;
    if(!name){
        return alert("enter the name")
    }
    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
        if(xhr.status==201){
            console.log(xhr.responseText)
            getUser()
        }else{
            console.error(xhr.responseText)
        }
    }
    xhr.open("POST","/users")
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.send(JSON.stringify({name : name}))
    e.target.username.value="";
})