import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
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
      //  console.log(data)
        setState((prevState) => { return { ...prevState, data } })
        
      })

  }, [])

  let deleteUser = (oldData) => {
    return axios.delete(`https://27--rest-api.glitch.me/api/book/${oldData._id}`)
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
    return axios.put(`https://27--rest-api.glitch.me/api/book/${oldData._id}`,newData)
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
    return axios.post(`https://27--rest-api.glitch.me/api/book`,newData)
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
      editable={{
        onRowAdd: addUser,
        onRowUpdate: updateUser,
        onRowDelete: deleteUser,
      }}
    />
  );
}
