import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {serverAPI} from './Const'

export default function AddActions() {
  const [state, setState] = useState({
    columns: [
      { title: 'ComputerName', field: 'ComName' },
      { title: 'Mac', field: 'Mac' },
      { title: 'Time Computer', field: 'timeCom' },
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
          if (item.idComputer==null) {item.idComputer={}}
          if (item.idCommand==null) {item.idCommand={}}
          let newitem={
              _id:item._id,
              Mac:item.idComputer.Mac,
              ComName:item.idComputer.ComName,
              timeCom:item.idComputer.lastSeen,
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
