// Generic CRUD for any schema.

import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext"

const Raw = () => {
    const {user} = useAuthContext()
    let allElements = [];
    [
        {name:'student'     ,apiName:'students'     ,baseSchema:require('../shared/base-schema/student.js'     )},
        //{name:'announcement',apiName:'announcements',baseSchema:require('../shared/base-schema/announcement.js')},
        //{name:'class'       ,apiName:'classes'      ,baseSchema:require('../shared/base-schema/class.js'       )},
        //{name:'user'        ,apiName:'user'         ,baseSchema:require('../shared/base-schema/user.js'        )},
    ].forEach((entry)=>{
        const readAll = async function(event){
            
            // Make server request.
            const response = await fetch('/api/'+entry.apiName+'/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            
            // Display result.
            const json = await response.json();
            console.log('%c '+(response.ok?'OK':'ERROR')+' ', 'background-color:#000000;color:#FFFFFF;');
            console.log(response);
            console.log(json);
            console.log('');
        };
        const readOne = async function(event){
            
            // Get text from <input> fields.
            const _id = event.target.parentNode.querySelector('input[data-property-name=\'_id\']').value;
            if (_id === ''){console.error('_id was blank. please fill in something.');return;}
            
            // Make server request.
            const response = await fetch('/api/'+entry.apiName+'/'+_id, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            
            // Display result.
            const json = await response.json();
            console.log('%c '+(response.ok?'OK':'ERROR')+' ', 'background-color:#000000;color:#FFFFFF;');
            console.log(response);
            console.log(json);
            console.log('');
            
            [...event.target.parentNode.querySelectorAll('input')].forEach(element=>{
               const propertyName = element.getAttribute('data-property-name');
               const propertyValue = json[propertyName];
               element.value = propertyValue;
            });
        };
        const update = async function(event){
            
            // Get text from <input> fields.
            const _id = event.target.parentNode.querySelector('input[data-property-name=\'_id\']').value;
            if (_id === ''){console.error('_id was blank. please fill in something.');return;}
            let item = {};
            [...event.target.parentNode.querySelectorAll('input')].forEach(element=>{
               const propertyName = element.getAttribute('data-property-name');
               if (propertyName === '_id'){return;} // No point sending _id.
               const propertyValue = element.value;
               item[propertyName] = propertyValue;
            });
            
            // Make server request.
            const response = await fetch('/api/'+entry.apiName+'/'+_id, {
                method: 'PATCH',
                body: JSON.stringify(item),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            // Display result.
            const json = await response.json();
            console.log('%c '+(response.ok?'OK':'ERROR')+' ', 'background-color:#000000;color:#FFFFFF;');
            console.log(response);
            console.log(json);
            console.log('');
        };
        const create = async function(event){
            
            // Get text from <input> fields.
            let item = {};
            [...event.target.parentNode.querySelectorAll('input')].forEach(element=>{
               const propertyName = element.getAttribute('data-property-name');
               const propertyValue = element.value;
               item[propertyName] = propertyValue;
            });
            
            // Make server request.
            const response = await fetch('/api/'+entry.apiName+'/', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            
            // Display result.
            const json = await response.json();
            console.log('%c '+(response.ok?'OK':'ERROR')+' ', 'background-color:#000000;color:#FFFFFF;');
            console.log(response);
            console.log(json);
            console.log('');
        };
        const delete_ = async function(event){
            
            // Get text from <input> fields.
            const _id = event.target.parentNode.querySelector('input').value;
            if (_id === ''){console.error('_id was blank. please fill in something.');return;}
            
            // Make server request.
            const response = await fetch('/api/'+entry.apiName+'/'+_id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            
            // Display result.
            const json = await response.json();
            console.log('%c '+(response.ok?'OK':'ERROR')+' ', 'background-color:#000000;color:#FFFFFF;');
            console.log(response);
            console.log(json);
            console.log('');
        };
        const elements = (
            <div key={entry.name} style={{'display':'inline-block','padding':'30px','border':'1px solid black'}}>
                <div>
                    <div>
                        Read All {entry.baseSchema.name}
                    </div>
                    <button onClick={readAll}>readAll</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        Read One & Update {entry.baseSchema.name}
                    </div>
                    _id <input data-property-name="_id" />
                    <button onClick={readOne} >readOne</button>
                    <br/>
                    {
                        Object.keys(entry.baseSchema.schema).map((propertyName)=>(
                            <React.Fragment key={propertyName}>
                                {propertyName} <input key={propertyName} data-property-name={propertyName} /><br/>
                            </React.Fragment>
                        ))
                    }
                    <button onClick={update}>update</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        Create {entry.baseSchema.name}
                    </div>
                    {
                        Object.keys(entry.baseSchema.schema).map((propertyName)=>(
                            <React.Fragment key={propertyName}>
                                {propertyName} <input key={propertyName} data-property-name={propertyName} /><br/>
                            </React.Fragment>
                        ))
                    }
                    <button onClick={create}>create</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        Delete {entry.baseSchema.name}
                    </div>
                    _id <input />
                    <button onClick={delete_}>delete_</button>
                </div>
            </div>
        );
        allElements.push(elements);
    });
    return allElements;
};
export default Raw