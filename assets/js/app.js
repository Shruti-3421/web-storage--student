   const cl = console.log;

//..22/12/23.......

const stdForm= document.getElementById('stdForm');
const submitBtn= document.getElementById('submitBtn');
const updateBtn= document.getElementById('updateBtn');
const fnameControl= document.getElementById('fname');
const lnameControl= document.getElementById('lname');
const emailControl= document.getElementById('email');
const contactControl= document.getElementById('contact');
const stdContainer= document.getElementById('stdContainer');

const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;

      return value.toString(16);
  });
};

// let stdArr = [];

// if(localStorage.getItem("stdInfo")){
//    stdArr = JSON.parse(localStorage.getItem("stdInfo"))
// }
     
   let stdArr = JSON.parse(localStorage.getItem("stdInfo")) || [];

   const insertTrsOfStd = (arr) =>{
       let result =``;
       arr.forEach((stdObj, i) => {
           result += `
                      <tr id="${stdObj.stdId}">
                        <td>${i + 1}</td>
                        <td>${stdObj.fname}</td>
                        <td>${stdObj.lname}</td>
                        <td>${stdObj.email}</td>
                        <td>${stdObj.contact}</td>
                        <td>
                          <i class="fa-solid fa-2x fa-pen-to-square text-primary" onclick="onEdit(this)"></i>  
                        </td>
                        <td>
                          <i class="fa-solid fa-2x fa-trash  text-danger ml-2" onclick="onDelete(this)"></i> 
                        </td>
                      </tr>   
                    `
       })
        stdContainer.innerHTML = result;
   }
     insertTrsOfStd(stdArr);    
         cl(stdArr)

 
   const onEdit= (ele) => {
      // cl(ele.closest("tr").id)
        let editId= ele.closest("tr").id

        // let obj = stdArr.find(std =>{
        //    return std.stdId === editId  
        // })
        let obj = stdArr.find(std => std.stdId === editId);
        localStorage.setItem('editObj', JSON.stringify(obj));
          cl(obj);
         submitBtn.classList.add('d-none');
         updateBtn.classList.remove('d-none');
         fnameControl.value = obj.fname;                        
         lnameControl.value = obj.lname ;          
         emailControl.value = obj.email;           
         contactControl.value = obj.contact;                     
   }       


  const onDelete = (ele) => {
    // // cl(ele);
    // // let deleteId = ele.parentElement.parentElement.getAttribute('id');
    //    let deleteId= ele.closest('tr').id;
    //    //cl(deleteId);
    //    let deleteIndex= stdArr.findIndex(std => {
    //        return std.stdId === deleteId
    //    })
    //    // cl(deleteIndex);
    //     stdArr.splice(deleteIndex, 1);
    //    // cl(stdArr);
    //     localStorage.setItem("stdInfo", JSON.stringify(stdArr));
    //     ele.closest('tr').remove()   //swal fire mein sab dal diya

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
         
            // let deleteId = ele.parentElement.parentElement.getAttribute('id');
            let deleteId= ele.closest('tr').id;
            //cl(deleteId);
            let deleteIndex= stdArr.findIndex(std => {
                return std.stdId === deleteId
            })
            // cl(deleteIndex);
              stdArr.splice(deleteIndex, 1);
            // cl(stdArr);
              localStorage.setItem("stdInfo", JSON.stringify(stdArr));
              ele.closest('tr').remove()
            Swal.fire({
              title: "Deleted!",
              text: "Student Info has been deleted.",
              icon: "success",
              timer: 3000
            });
          }
        }); 
  }


  const onStdAddHandler = (eve) => {
    eve.preventDefault();    
    let newStdObj = {
      fname : fnameControl.value,
      lname : lnameControl.value,
      email : emailControl.value,
      contact : +contactControl.value,  //value string nko asel tr pude number()/+ ase typpe
      stdId :  generateUuid()  
    }        
     stdArr.push(newStdObj);
      cl(stdArr);
     eve.target.reset()

     localStorage.setItem("stdInfo", JSON.stringify(stdArr));
//  templating..insertTrsOfStd(stdArr); => we have to create single tr & append in body
//ithe templating kle tr all tr are recreated so here not templating call use
    let tr = document.createElement("tr");
    tr.id = newStdObj.stdId;
     tr.innerHTML = `
                      <td>${stdArr.length}</td>
                      <td>${newStdObj.fname}</td>
                      <td>${newStdObj.lname}</td>
                      <td>${newStdObj.email}</td>
                      <td>${newStdObj.contact}</td>    
                      <td>
                         <i class="fa-solid fa-2x fa-pen-to-square text-primary" onclick="onEdit(this)"></i>  
                      </td>
                      <td>
                         <i class="fa-solid fa-2x fa-trash  text-danger ml-2" onclick="onDelete(this)"></i>
                      </td>    

                    `; 
        stdContainer.append(tr);
       Swal.fire({
            title: `${newStdObj.fname} ${newStdObj.lname} added as new user`,
            icon: `success`,
            timer: 3000
        })
}


const onStdUpdate = () => {
   let updatedObj = {
      fname : fnameControl.value,
      lname : lnameControl.value,
      email : emailControl.value,
      contact : contactControl.value  
      // stdId :  generateUuid()  
   }
     cl(updatedObj);

     let editObj = JSON.parse(localStorage.getItem('editObj'));
      
     let updateId = editObj.stdId;
      
     let updateIndex = stdArr.findIndex(std => {
        return std.stdId === updateId
     })
       cl(updateIndex);

      stdArr[updateIndex].fname = updatedObj.fname;       
      stdArr[updateIndex].lname= updatedObj.lname;
      stdArr[updateIndex].email= updatedObj.email;      
      stdArr[updateIndex].contact = updatedObj.contact;

      localStorage.setItem('stdInfo', JSON.stringify(stdArr));
      
      stdForm.reset();
      updateBtn.classList.add('d-none');
      submitBtn.classList.remove('d-none'); 

      let tr = document.getElementById(updateId);
      tr.innerHTML =`
                        <td>${updateIndex + 1}</td>
                        <td>${updatedObj.fname}</td>
                        <td>${updatedObj.lname}</td>
                        <td>${updatedObj.email}</td>
                        <td>${updatedObj.contact}</td>    
                        <td>
                            <i class="fa-solid fa-2x fa-pen-to-square text-primary" onclick="onEdit(this)"></i>  
                        </td>
                        <td>
                            <i class="fa-solid fa-2x fa-trash  text-danger ml-2" onclick="onDelete(this)"></i>
                        </td>    

                      `

      Swal.fire({
        title: `${updatedObj.fname} ${updatedObj.lname} user information is updated`,
        icon: `success`,
        timer: 3000
     })

}



stdForm.addEventListener('submit', onStdAddHandler);
updateBtn.addEventListener('click', onStdUpdate)