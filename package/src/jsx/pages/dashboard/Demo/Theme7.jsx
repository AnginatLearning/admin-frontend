import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme7 = () => {
    const { changeBackground,
		changeNavigationHader,
		changePrimaryColor,
		chnageHaderColor,
		changeSideBarLayout,
		changeSideBarPostion,
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        changeSideBarLayout({value:'horizontal', label:'Horizontal'})
		
		changeNavigationHader('color_5');        
		chnageHaderColor('color_5');		
		changePrimaryColor('color_5');
	}, []);
    return (
        <>
            <DashboardBlog />
        </>
    );
};

export default Theme7;