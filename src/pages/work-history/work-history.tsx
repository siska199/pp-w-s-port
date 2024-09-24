import HeaderPage from "@components/ui/header-page";

const WorkHistory = () => {
  
  const handleAddDataHistory = ()=>{

  }
  
  return(
    <div className="container-page">
      <HeaderPage title="Work History" onClickAddData={handleAddDataHistory}/>
    </div>
  )
};

export default WorkHistory;
