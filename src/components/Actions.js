import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { serverAPI } from './Const'
import {tableIcons} from './tableicon'
import {Replay} from '@material-ui/icons';


export default function Actions() {
  const [state, setState] = useState({});

let deleteAction = (oldData) => {
  return axios.delete(serverAPI + `/actions/${oldData._id}`)
    .then(res => {
      if (oldData) {
        setState((prevState) => {
          const data = [...prevState.data];
          data.splice(data.indexOf(oldData), 1);
          return { ...prevState, data };
        });
      }
    })
    .catch(error => {
      console.log(error)
    }
    );
}
let addAction = (newData) => {
//  console.log(newData)
  return axios.post(serverAPI + '/actions',newData)
    .then(res => {
     // console.log(res.data)
      setState((prevState) => {
        const data = [...prevState.data];
        data.push(res.data);
        return { ...prevState, data };
      });
           
    })
    .catch(error => {
      console.log(error)
    }
    );
}

async function getData() {
 
  let listIDGroups={} ;
  let listIDCommands={};
  let data = [];
  
  //get listGroup

  let listGroups=await axios.get(serverAPI + '/groupcomputers');
  listGroups=listGroups.data;
  
  for (let group of listGroups) {
    listIDGroups[group._id]=group.groupName;
  }

  //get listCommand
  let listCommands=await axios.get(serverAPI + '/commands');
  listCommands=listCommands.data;
  for (let command of listCommands) {
    listIDCommands[command._id]=command.nameCommand;
  }
 // console.log(listIDCommands)
  //get data

  let listActions = await axios.get(serverAPI + '/actions');
  data=listActions.data;
  data = data.map((item) => {
    if (item.idGroup == null) { item.idGroup = {} }
    if (item.idCommand == null) { item.idCommand = {} }
    let newitem = {
      _id: item._id,
      idGroup: item.idGroup._id,
      idCommand: item.idCommand._id,
      timeCreate:item.timeCreate,
      countComputers: item.countComputers,
    }
   // console.log(item)

    return newitem
  })


  //reset 
  
  //set state
  let newState = {
    columns: [
      { title: 'Group Name', field: 'idGroup', lookup:listIDGroups},
      { title: 'Name Command', field: 'idCommand',lookup:listIDCommands},
      { title: 'Time Create', field: 'timeCreate' },
      { title: 'Count Receive', field: 'countComputers'},
      { title: 'Reset', render:(rowData)=>{
        return (
        <IconButton>
        <Replay onClick={async ()=>{
          await axios.put(serverAPI + `/actions/${rowData._id}`)
        }}/>
        </IconButton>)
      }}
    ],
    data: data,
  }
  setState(newState)

}

useEffect(() => {
  getData()
}, [])

return (

  <MaterialTable
    title="Task Schedule"
    columns={state.columns}
    data={state.data}
    icons={tableIcons}
    editable={{
      onRowAdd: addAction,
      onRowDelete: deleteAction,
    }}
  />


);
  }
