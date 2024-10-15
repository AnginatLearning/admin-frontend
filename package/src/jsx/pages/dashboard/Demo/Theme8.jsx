import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme8 = () => {
    const { changeBackground,
		changeNavigationHader,
		changePrimaryColor,		
		chnageSidebarColor,
		changeSideBarPostion,
		changeSideBarStyle
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
        changeSideBarStyle({ value: "modern", label: "Modern" });
		changeNavigationHader('color_14');	
		chnageSidebarColor('color_14');
		changePrimaryColor('color_14');
		changeSideBarPostion({ value: "static", label: "Static" });
		
	}, []);
    return (
        <>
            <DashboardBlog />   
        </>
    );
};

export default Theme8;