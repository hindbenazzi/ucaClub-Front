import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();
const reducer = (state,action) => {
    switch(action.type){
            case 'delete_cnt':
                return {
                    typeLocals : state.typeLocals.filter((contact)=>contact.id !== action.payload)
             };
             case 'add_cnt':
                return {
                    typeLocals : [action.payload, ...state.typeLocals]
             };


             default :return state;
    }
}
export class Provider extends Component {

    state = {
        test : "hay",
        typeLocals : [
            {id: 1, name:"AICHA LMAZGHI" , tel:"06458689", email:"aichalmazghi@gmail.com"},
            {id: 2, name:"KHALID BOUHOUCH" , tel:"06458689", email:"aichalmazghi@gmail.com"},
            {id: 3, name:"MAOURAN BOUHOUCH" , tel:"06458689", email:"aichalmazghi@gmail.com"}
        ],
        dispatch: action => this.setState(state => reducer(state,action))
    }
  
    
    render() {
       /* axios.get("http://127.0.0.1:8000/types")
        .then(res => this.setState({
           typeLocals : res.data
        }))
        .catch(err => console.log(err));*/
      
        return (
            <Context.Provider value={{
                state: this.state
              }}>           
            {this.props.children}
            </Context.Provider>
           
        )
    }
}
export const Consumer = Context.Consumer;
//export const Consumer = Context.Consumer;
//export mean this attrb we can use it brass
//si on export bcp de chose on elimine default
//wa can have a lot of attrbu here ===>  {this.props.children}