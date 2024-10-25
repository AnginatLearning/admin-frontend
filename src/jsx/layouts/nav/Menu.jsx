export const MenuList = [
    //Dashboard
    {
        title:"Main Menu",
        classsChange: "menu-title",
        extraclass:"first"
    },
    //Dashboard
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-home" />,
        content: [
            {
                title: 'Dashboard 1',
                to: 'dashboard',					
            },
           
           
        ],
    },
    

    

    

    //Professors    
    {
        title: 'Professors',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-user" />,
        content: [
            {
                title: 'All Professor',
                to: 'all-professors',					
            },
            {
                title: 'Add Professor',
                to: 'add-professor',
            },
            {
                title: 'Edit Professor',
                to: 'edit-professor',
            },
            {
                title: 'Professor Profile',
                to: 'professor-profile',
            },
           
        ],
    },
    //Student    
    {
        title: 'Students',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-users" />,
        content: [
            {
                title: 'All Students',
                to: 'all-students',					
            },
            {
                title: 'Add Students',
                to: 'add-student',
            },
            {
                title: 'Edit Students',
                to: 'edit-student',
            },
            {
                title: 'About Students',
                to: 'about-student',
            },
           
        ],
    },

    //Courses    
    {
        title: 'Courses',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-graduation-cap" />,
        content: [
            {
                title: 'All Courses',
                to: 'all-courses',					
            },
            {
                title: 'Add Courses',
                to: 'add-courses',
            },
            {
                title: 'Edit Courses',
                to: 'edit-courses',
            },
            {
                title: 'About Courses',
                to: 'about-courses',
            },
           
        ],
    },
    //Library    
    {
        title: 'Library',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="la la-book" />,
        content: [
            {
                title: 'All Library',
                to: 'all-library',					
            },
            {
                title: 'Add Library',
                to: 'add-library',
            },
            {
                title: 'Edit Library',
                to: 'edit-library',
            },            
           
        ],
    },
    //   Lead
    {
        title: 'Lead',	        
        to:"Lead-management",
        iconStyle: <i class="las la-headphones"></i>,        
    },
    
    
   

    
    

   
    
   
   

    
   
    
    
]