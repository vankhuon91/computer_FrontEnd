import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {serverAPI} from './Const'

export default function Actions() {
  const [state, setState] = useState({
    columns: [
      { title: 'ComputerName', field: 'comName' },
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

  let deleteUser = (oldData) => {
    return axios.delete(`https://27--rest-api.glitch.me/api/transaction/${oldData._id}`)
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

  let updateUser = (newData, oldData) => {
    return axios.put(`https://27--rest-api.glitch.me/api/transaction/${oldData._id}`,newData)
      .then(res => {
        if (oldData) {
          setState((prevState) => {
            const data = [...prevState.data];
            data[data.indexOf(oldData)] = newData;
            return { ...prevState, data };
          });
        }
      })
      .catch(error => {
        console.log(error)
      }
      );
  }

  let addUser = (newData) => {
    return axios.post(`https://27--rest-api.glitch.me/api/transaction`,newData)
      .then(res => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push({...newData,timeStart: new Date().toISOString()});
          return { ...prevState, data };
        });
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
        onRowAdd: addUser,
        onRowUpdate: updateUser,
        onRowDelete: deleteUser,
      }}
    />
  );
}
