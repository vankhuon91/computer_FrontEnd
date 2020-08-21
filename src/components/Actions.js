import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {serverAPI} from './Const'

export default function Actions() {
  const [state, setState] = useState({
    columns: [
      { title: 'Group Name', field: 'groupName' },
      { title: 'Rule filter', field: 'filter' },
      { title: 'Tag', field: 'tag'},
      { title: 'Name Command', field: 'nameCommand' },
      { title: 'Time Create', field: 'timeCreate' },
      { title: 'Time Receive', field: 'timeReceive' },
    ],
    data: [],
  });
  useEffect(() => {
    axios.get(serverAPI+'/actions')
      .then((res) => {
        let data = res.data;
        data=data.map((item)=>{
          if (item.idGroup==null) {item.idGroup={}}
          if (item.idCommand==null) {item.idCommand={}}
          let newitem={
              _id:item._id,
              groupName:item.idGroup.groupName,
              filter:item.idGroup.filter,
              tag:item.idGroup.groupTag,
              nameCommand:item.idCommand.nameCommand,
              timeReceive:item.timeReceive ,
              timeCreate:item.timeCreate
          }
          return newitem
      })
    
        setState((prevState) => { return { ...prevState, data } })
        
      })

  }, [])

  let deleteAction= (oldData) => {
    return axios.delete(serverAPI+`/actions/${oldData._id}`)
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


  return (
    <MaterialTable
      title="Actions"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowDelete: deleteAction,
      }}
    />
  );
}
