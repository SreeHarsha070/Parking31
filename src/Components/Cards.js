import React, { useState, useRef, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
//import {Cars} from './data';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';



// for(let i=0;i<=10;i++){
//     arr[i] = {'id':i};
//     arr[i]= {'title':'Car '+i};
// }

function Cards() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const [range, setRange] = useState(50);
    const [cardata, setCardata] = useState([])
    const [allocatedList, setAllocatedList] = useState([2, 8, 10]);
    const emprtyslots = [];
    const [selectslotnum, setSelectslotnum] = useState(0);
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [slotlist, setSlotlist] = useState({
      id: null,
      title: null,
      name: null,
      status: null,
    })

    const [dataList, setDataList] = useState([])



const nameslist = [];
const arr = [];
nameslist[2] = 'ravi';
nameslist[8] = 'harsha';
nameslist[10] = 'kiran';
let min = 1;


for(let i=1;i<=range;i++){
    
    if(allocatedList.includes(i) == true ){
        arr[i] = {'id':i,'title':'Slot '+i,'name':nameslist[i],'status':1};  
        //setSlotlist(slotlist => [...slotlist,  {'id':i,'title':'Slot '+i,'name':nameslist[i],'status':1})
        //setSlotlist(slotlist => ({ ...slotlist, ["id"]: i,["title"]: 'Slot '+i, ["name"]: nameslist[i], ["status"]: 1 }));
      
    }else if(allocatedList.includes(i) == false ){
        
        arr[i] = {'id':i,'title':'Slot '+i,'name':null,'status':0};
        //setSlotlist(slotlist => [...slotlist,  {'id':i,'title':'Slot '+i,'name':null,'status':0})
        //setSlotlist(slotlist => ({ ...slotlist, ["id"]: i,["title"]: 'Slot '+i, ["name"]: null, ["status"]: 0 }));
       
    }
    
}

useEffect(() => {
  arr.map((slot, index)=>{
       

         setDataList(slot)
     
  })
},[])
//setSlotlist(arr);
 const addMore = ()=>{
    setRange(range + 10)
 }


const handleShow = (num) => {
    //console.log(min);
    //console.log(num);
    if(min < num ){
      alert(`Slot ${min} is available.  Please choose numeric order only.`)
    }else{
      setShow(true);
      const index = emprtyslots.indexOf(num)
      setSelectslotnum(num);
      min = num;
    }
    
    
}

const movetoFree = (num) => {
  console.log(num)
  //setShow(true);
  const index = allocatedList.indexOf(num)
  
  //setSelectslotnum(num);


  //console.log(index)
   
      allocatedList.splice(index, 1)
      alert(`The  slot ${num} is moved to freeup`)
      arr[num].status = 0;
      setAllocatedList(allocatedList)
    

}


const onSubmitHandler = (event) => {
    event.preventDefault();
    alert(`The Person : ${name} Successfully booked slot ${selectslotnum} `)
    setAllocatedList(allocatedList => [...allocatedList, selectslotnum])
    arr[selectslotnum].name = name;
    setShow(false);
    setName("");
    setMobile("");
  }

 const popover = (data) => (
   
    <Popover id="popover-basic">
      <Popover.Header as="h3">Menu</Popover.Header>
      <Popover.Body>
    {/* {data.title} */}
    {data.status==1 ? 
    <p> The Person {data.name} Already Booked this slot <br /><span>Options : <Button variant="primary" onClick={()=>{movetoFree(data.id)}}>
    Move to free
  </Button></span> </p>:
    // <Button onClick={()=>{fillSlot(data.id)}}>Free Up</Button>
    <Button variant="primary" onClick={()=>{handleShow(data.id)}}>
        Available,Book the slot
      </Button>
    }
      </Popover.Body>
    </Popover>
  )

return (
    <Container>
    <Row>
        <h3 style={{textAlign:"center",marginTop:"20px",marginBottom:"20px",color:"white",textDecoration:"underline"}}>Parking Management System</h3>
        {
            arr.map((slot, index)=>{
                return(
                  <Col style={{marginTop:"10px"}} md={2} key={index}>
                    <div className="ranga1">
                        <div className="border1 top text-center"> {slot.title} 
                        
                    <OverlayTrigger trigger="click" rootClose  placement="right" overlay={popover(slot)}>
                    <Button variant="success">Book Slot</Button>
                    </OverlayTrigger>
                        
                        </div>
                    </div>
                </Col>
                )
            })
        }
    </Row>
        <Button variant="primary" style={{marginTop:"10px"}} onClick={addMore}>Add More</Button>


        

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Book Your Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={onSubmitHandler}>
            <div><label htmlFor="name">Name</label></div>
            <div><input id="name" value={name}  onChange={(e) => setName(e.target.value)} type="text"/></div>
            <div><label htmlFor="mobile">Mobile</label></div>
            <div><input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} type="number"/></div>
            <input type="submit"/>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
  </Container>   
  );
}

export default Cards;
