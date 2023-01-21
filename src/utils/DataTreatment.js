import axios from "axios";

const getAll=async(element,setstatusFunction)=>
{
 await axios
 .get("/api/"+element)
 .then((res) => {
   if (res.data.data.length > 0) {
     setstatusFunction(res.data.data);

     return "success";
   } else {
     return "there is no  " + element +" in system !! ";
   }
 })
 .catch((err) => {
   return "error getting " + element +" : "+err;
 });
}


const transformForMultiSelect=(tab,label,value)=>{
    return tab.map((e) => {
     return { label: e.label, value: e.value };
   });
 }

 const getValues=(table)=>{
   console.log(table)
    return table.map((std) => {
        return std.value;
      });
 }
 const getlables=(table)=>{
  console.log(table)
   return table.map((std) => {
       return std.label;
     });
}

const FormatDate= (date)=>{
const d= new Date(date);
const day= d.getDate();
const month= d.getMonth()+1;
const year= d.getFullYear();

return day+"/"+month+"/"+year;

}


const getTime=(date)=>
{
  const d= new Date(date);
  console.log(d)
  const hour= d.getHours();
  const minute= d.getMinutes();
  return hour+":"+minute;
}

const transformDateTOStandard=(date)=>
{
const d= new Date(date);
const day= d.getDate();
const month= d.getMonth()+1;
const year= d.getFullYear();

return year+"-"+month+"-"+day;
}

 export  {transformForMultiSelect,getAll,getValues,getlables,FormatDate,getTime,transformDateTOStandard};
