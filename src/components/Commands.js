import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import {tableIcons} from './tableicon'
import {serverAPI} from './Const'
export default function Commands() {
  const [state, setState] = useState({
    columns: [
      { title: 'Name Commands', field: 'nameCommand' },
      { title: 'Type Commands', field: 'typeCommand' },
      { title: 'More Infomations', field: 'infoCommand' },
      

    ],
    data: [],
  });
  useEffect(() => {
    axios.get(serverAPI+'/commands')
      .then((res) => {
        let data = res.data;
        data = data.map((item)=>{
          let newItem={...item};
          newItem.infoCommand=JSON.stringify(item.infoCommand)
          return newItem;
        })
        setState((prevState) => { return { ...prevState, data } })
        
      })

  }, [])

  let deleteCommand = (oldData) => {
    return axios.delete(serverAPI+`/commands/${oldData._id}`)
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

  let updateCommand = (newData, oldData) => {
    let sendData={...newData}
    sendData.infoCommand=JSON.parse(newData.infoCommand);
    return axios.put(serverAPI+`/commands/${oldData._id}`,sendData)
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

  let addCommand = (newData) => {
    let sendData={...newData}
    sendData.infoCommand=JSON.parse(newData.infoCommand);
    return axios.post(serverAPI+'/commands',sendData)
      .then(res => {
        setState((prevState) => {
          const data = [...prevState.data];
          data.push(newData);
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
      title="Commands"
      columns={state.columns}
      data={state.data}
      icons={tableIcons}
      editable={{
        onRowAdd: addCommand,
        onRowUpdate: updateCommand,
        onRowDelete: deleteCommand,
      }}
    />
  );
}
