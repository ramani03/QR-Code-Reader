const main=document.querySelector(".main");
const form=main.querySelector("form");
const choosefile=form.querySelector("input");
const text=form.querySelector("p");
const btncopy=main.querySelector(".copy")
const btnclose=main.querySelector(".end")

//qr sever api
function fetchreq(fd,f){
    text.innerText="Scanning in Process"
fetch("http://api.qrserver.com/v1/read-qr-code/",{
    method:"POST",body:fd
}).then(res=>res.json()).then(result =>{
    result=result[0].symbol[0].data;
    text.innerText= result?"Upload a QRCode":"NO RESULT FOUND TRY AGAIN ..";
    if(!result) return;
    
    main.querySelector("textarea").innerText=result
    console.log(result);
    form.querySelector("img").src=URL.createObjectURL(f);
    
    main.classList.add("active");
    
}).catch(()=>{
    text.innerText="NO RESULT FOUND TRY AGAIN ..";
});
}

choosefile.addEventListener("change",e=>{
 let f= e.target.files[0];
 if(!f) return;
// console.log(f);
let fd=new FormData();
fd.append("file",f);
fetchreq(fd,f);
});
form.addEventListener("click",()=>choosefile.click())

btnclose.addEventListener("click",()=> main.classList.remove("active"));

btncopy.addEventListener("click",()=>{
let data=main.querySelector("textarea").textContent;
navigator.clipboard.writeText(data);
});
