// Generic CRUD for any schema.

import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext"

const Raw = () => {
    const {user} = useAuthContext()
    let allElements = [
        <style key='style'>textarea{'{'}width:100%;height:90px;{'}'}</style>
    ];
    [
        {name:'student'     ,apiName:'students'     ,baseSchema:require('../shared/base-schema/student.js'     ),readAllWhitelist:['_id','name']},
        //{name:'announcement',apiName:'announcements',baseSchema:require('../shared/base-schema/announcement.js')},
        //{name:'class'       ,apiName:'classes'      ,baseSchema:require('../shared/base-schema/class.js'       )},
        //{name:'user'        ,apiName:'user'         ,baseSchema:require('../shared/base-schema/user.js'        )},
    ].forEach((entry)=>{
        const readAll = async function(event){
            
            const textarea = event.target.parentNode.querySelector('textarea');
            
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
            textarea.value = JSON.stringify(json.map(row=>{
                const newRow = {};
                entry.readAllWhitelist.forEach(property=>{
                    newRow[property] = row[property];
                });
                return newRow;
            }));
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
            
            [...event.target.parentNode.querySelectorAll('textarea')].forEach(element=>{
               const propertyName = element.getAttribute('data-property-name');
               const propertyValue = JSON.stringify(json[propertyName]);
               element.value = propertyValue;
            });
        };
        const update = async function(event){
            
            // Get text from <input> fields.
            const _id = event.target.parentNode.querySelector('input[data-property-name=\'_id\']').value;
            if (_id === ''){console.error('_id was blank. please fill in something.');return;}
            let item = {};
            [...event.target.parentNode.querySelectorAll('textarea')].forEach(element=>{
               const propertyName = element.getAttribute('data-property-name');
               if (propertyName === '_id'){return;} // No point sending _id.
               const propertyValue = JSON.parse(element.value);
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
            [...event.target.parentNode.querySelectorAll('textarea')].forEach(element=>{
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
            <div key={entry.name} style={{'width':'100%','padding':'30px','border':'1px solid black'}}>
                <div>
                    <div style={{'fontWeight':'bold','fontSize':'150%'}}>
                        Read All {entry.baseSchema.name}
                    </div>
                    <br/>
                    <button onClick={readAll}>readAll</button>
                    <br/>
                    <br/>
                    <textarea style={{'fontFamily':'monospace'}} />
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div style={{'fontWeight':'bold','fontSize':'150%'}}>
                        Read One & Update {entry.baseSchema.name}
                    </div>
                    <br/>
                    _id <input data-property-name="_id" />
                    <button onClick={readOne} >readOne</button>
                    <br/>
                    <br/>
                    {
                        Object.keys(entry.baseSchema.schema).map((propertyName)=>(
                            <React.Fragment key={propertyName}>
                                <div>{propertyName} (JSON)</div>
                                <textarea style={{'fontFamily':'monospace'}} key={propertyName} data-property-name={propertyName} /><br/><br/>
                            </React.Fragment>
                        ))
                    }
                    <button onClick={update}>update</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div style={{'fontWeight':'bold','fontSize':'150%'}}>
                        Create {entry.baseSchema.name}
                    </div>
                    <br/>
                    {
                        Object.keys(entry.baseSchema.schema).map((propertyName)=>(
                            <React.Fragment key={propertyName}>
                                <div>{propertyName} (JSON)</div>
                                <textarea style={{'fontFamily':'monospace'}} key={propertyName} data-property-name={propertyName} /><br/><br/>
                            </React.Fragment>
                        ))
                    }
                    <button onClick={create}>create</button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <div style={{'fontWeight':'bold','fontSize':'150%'}}>
                        Delete {entry.baseSchema.name}
                    </div>
                    <br/>
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