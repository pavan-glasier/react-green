import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function IsAuth (){
    
if (!localStorage.getItem('authUser')) {
    return <Redirect to={'/login'} />;
} 
  return(
        <div></div>
    );
}
export default IsAuth;