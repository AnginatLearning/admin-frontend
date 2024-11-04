import React from 'react';
import {Link} from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import {SparklinesBars, 
	SparklinesLine,Sparklines
} 
from "react-sparklines";

import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

//Import Components
import { BgCard } from '../../elements/CardDesign';
import { IMAGES } from '../../constant/theme';
import CkEditorBlog from '../../elements/CkEditor/CkEditorBlog';

//Charts
const SurveyChart = loadable(() =>
 	pMinDelay(import("../../elements/dashboard/SurveyChart"), 500)
);
const DonughtChart = loadable(() =>
 	pMinDelay(import("../../elements/dashboard/DonughtChart"), 500)
);
const University = loadable(() =>
 	pMinDelay(import("../../elements/dashboard/University"), 500)
);

const bgCarddBlog = [
    {title:"Total Students", number:'3180', icon: <i className="la la-users" />, percent:'80%', color:"primary"},
    {title:"New Students", number:'360', icon:<i className="la la-user" />, percent:'50%', color:"warning"},
    {title:"Total Course", number:'28', icon:<i className="la la-graduation-cap" />, percent:'60%', color:"secondary"},
    {title:"Total Leads", number:'12', icon:<i className="la la-dollar" />, percent:'35%', color:"danger"},
];

const detailCard = [
	{title:"When Is the Best Time to Take an Education Course?", name:'Jack Ronan', image:IMAGES.course1},
	{title:"Education Courses: A Guide to Unlocking Your Potential", name:'Jimmy Morris', image:IMAGES.course2},
	{title:"A Comprehensive Guide to Taking an Education Course", name:'Konne Backfield', image:IMAGES.course3},
	{title:"Why Should You Consider Taking an Education Course?", name:'Nashid Martines', image:IMAGES.course4},
];

const examTable = [
	{roll:'542', name:' Jack Ronan' },
	{roll:'360', name:'Jimmy Morris' },
	{roll:'450', name:'Samantha' },
	{roll:'296', name:'Roman Aurora' },
	{roll:'520', name:'Nashid Martines' },
	{roll:'620', name:'Daigno' },
];

const tabelData = [
	{no:'01', name : "Jack Ronan",  proff:"Airi Satou", date:"02 jan 2024", status:'Checkin', color:'primary', subject:'Commerce', fees:'120'},
	{no:'02', name : "Jimmy Morris",  proff:"Angelica Ramos", date:"02 jan 2024", status:'Pending', color:'warning', subject:'Mechanical', fees:'205'},
	{no:'03', name : "Nashid Martines",  proff:"Ashton Cox", date:"04 jan 2024", status:'Canceled', color:'danger', subject:'Science', fees:'180'},
	{no:'04', name : "Roman Aurora",  proff:"Cara Stevens", date:"05 jan 2024", status:'Process', color:'info', subject:'Arts', fees:'200'},
	{no:'05', name : "Samantha",  proff:"Bruno Nash", date:"06 jan 2024", status:'Checkin', color:'primary', subject:'Maths', fees:'210'},
	
];

const Home = () => {		
	return(
		<>
			<Row>
				{bgCarddBlog.map((item, index)=>(
					<Col xl={'3'} xxl={'3'} sm={'6'} key={index}>
						<div className={`widget-stat card bg-${item.color}`}>
							<div className="card-body " >								
								<BgCard title={item.title} number={item.number} percent={item.percent} color={item.color} icon={item.icon}/>
							</div>
						</div>
					</Col>		
				))}
			</Row>				
		</>
	)
}
export default Home;