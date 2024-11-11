import React from 'react';
import { Col, Dropdown, Row, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { 
	SparklinesLine,Sparklines
} 
from "react-sparklines";

import { ProgressCard } from '../../elements/CardDesign';
import { IMAGES } from '../../constant/theme';
import IncomeExpense from '../../elements/dashboard/IncomeExpense';

const CarddBlog = [
    {title:"Total Students", number:'3180', percent:'80%', color:"primary"},
    {title:"New Students", number:'360',  percent:'50%', color:"danger"},
    {title:"Total Course", number:'28',  percent:'76%', color:"red"},
    {title:"Total Leads", number:'45',  percent:'35%', color:"success"},
];

const mediaBlog = [
    { name:'Theodore Handle', image: IMAGES.education1, subject:'B.Com', status:'Available'},
    { name:'Bess Willis', image: IMAGES.education2, subject:'M.Com', status:'Not Available'},
    { name:'James Jones', image: IMAGES.education3, subject:'M.Tach', status:'Available'},
    { name:'Smith Watson', image: IMAGES.education4, subject:'B.Tach', status:'Not Available'},
    { name:'Morese Sharpe', image: IMAGES.education5, subject:'B.A, M.A', status:'Available'},
];

const studentTable = [
    {id:1, isChecked:false,name:'Angelica Ramos', coach:'Ashton Cox', date:'12 Jan 2024', time:'10:15'},
    {id:2, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'11 Jan 2024', time:'10:30'},
    {id:3, isChecked:false,name:'Cedric Kelly', coach:'Brielle Williamson', date:'10 Jan 2024', time:'09:45'},
    {id:4, isChecked:false,name:'Caesar Vance', coach:'Herrod Chandler', date:'08 Jan 2024', time:'10:20'},
    {id:5, isChecked:false,name:'Rhona Davidson', coach:'Sonya Frost', date:'09 Jan 2024', time:'09:30'},
    {id:6, isChecked:false,name:'Bradley Greer', coach:'Brenden Wagner', date:'15 Jan 2024', time:'09:50'},
];

const salaryTable = [
    { image: IMAGES.education2, name:"Angelica Ramos", color:'success', status:'Paid', date:'12 Jan 2024', amount:'100', transId:'42317'},
    { image: IMAGES.education1, name:"Cedric Kelly", color:'danger',status:'Unpaid', date:'07 Jan 2024', amount:'200', transId:'13369'},
    { image: IMAGES.education4, name:"Bradley Greer",color:'warning', status:'Pending', date:'08 Jan 2024', amount:'150', transId:'25413'},
    { image: IMAGES.education3, name:"Rhona Davidson",color:'danger', status:'Unpaid', date:'02 Jan 2024', amount:'250', transId:'74125'},
    { image: IMAGES.education5, name:"Caesar Vance", color:'success', status:'Paid', date:'10 Jan 2024', amount:'300', transId:'23654'},
];

const ChartDetail = (props) =>{
    return(
        <div className="row mt-2">
            <div className="col">
                <h6 className="font-weight-normal">{props.title}</h6>
                <strong>{props.all}</strong>
            </div>
            <div className="col">
                <h6 className="font-weight-normal">Montly</h6>
                <strong>{props.monthly}</strong>
            </div>
            <div className="col">
                <h6 className="font-weight-normal">Day</h6>
                <strong>{props.day}</strong>
            </div>
        </div>
    )
}

const Dashboard2 = () => {
    const chackboxFun = (type) => {
        setTimeout(()=>{               
           const chackbox = document.querySelectorAll(".customer_shop_single input");
           const motherChackBox = document.querySelector(".customer_shop input");
           for (let i = 0; i < chackbox.length; i++) {
              const element = chackbox[i];
              if (type === "all") {
                 if (motherChackBox.checked) {
                    element.checked = true;
                 } else {
                    element.checked = false;
                 }
              } else {
                 if (!element.checked) {
                    motherChackBox.checked = false;
                    break;
                 } else {
                    motherChackBox.checked = true;
                 }
              }
           }
        },100)
    };
    return (
        <>
            <Row>
                <Col xl={"6"} xxl={"6"} sm={"12"} >
                    <Row>
                        {CarddBlog.map((item, index)=>(
                            <Col xl={"6"} xxl={"6"} sm={"6"} key={index}>
                                <div className="widget-stat card" style={{paddingBottom:"0px"}}>                                
                                    <ProgressCard title={item.title} number={item.number} percent={item.percent} color={item.color}/>
                                </div>
                            </Col>
                        ))}
                    </Row>   
                </Col>   
            </Row>   
        </>
    );
};

export default Dashboard2;