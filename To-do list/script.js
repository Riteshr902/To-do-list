const inputUser=document.getElementById('userInput');
const inputBtn=inputUser.innerText;
const teamnames=document.getElementById('InputTeams');
const recordDisplay=document.getElementById('records');
let editFun=null;

let userArray=[];


let objStr=localStorage.getItem('user');
if(objStr!=null){
userArray=JSON.parse(objStr);
}

displayData();
inputUser.onclick=()=>{
    const names= teamnames.value;
    if(editFun!=null){
        //edit
        userArray.splice(editFun,1,{'name': names});
    }else{
        //add
        
        userArray.push({'name': names})
    }
   saveData(userArray);
   teamnames.value='';
   displayData();
   inputUser.innerText=inputBtn;
}

function saveData(){
    let str=JSON.stringify(userArray);
localStorage.setItem('user',str);
}

function displayData(){
     let statement='';
     userArray.forEach((user,i)=>{
        statement +=`<tr class="row2" style="text-align: center; color:#FCF8E8 ;font-size:20px;">
        <th scope="row" style="color:red">${i+1}</th>
        <td style="font-weight:550;color:white; font-size:25px">${user.name}</td>
        <td style="color:red; font-weight:500">${100-i}</td>
        <td><i class="btn-warning fa fa-edit mx-2 btn text-white" onclick="editData(${i})"></i><i class=" btn-danger btn text-white fa fa-trash-o"  onclick="deleteData(${i})"></i></td>
        
    </tr>`;
    });
     recordDisplay.innerHTML=statement;
}

function editData(id){
   editFun=id;
   teamnames.value=userArray[id].name;
   inputUser.innerText="Save changes";
    
}

function deleteData(id){
    userArray.splice(id,1);
    saveData(userArray);
    displayData();
}


//search
const List=document.querySelectorAll('#records tr');
const searchItems=document.querySelector('#search');
searchItems.addEventListener('input', function(e){
   const searched=e.target.value.toLowerCase();
   recordDisplay.innerHTML="";
   List.forEach(tr=>{
    const tdInTr=tr.querySelectorAll('td');
    if(tdInTr[0].innerText.toLowerCase().indexOf(searched)>-1){
        recordDisplay.append(tr);
    }
   });
   if(recordDisplay.innerHTML==''){
    recordDisplay.innerHTML='No records found';
   }
});

