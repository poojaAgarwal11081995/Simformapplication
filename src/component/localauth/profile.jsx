import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import DragAndDrop from '../dragAndDrop'
import { ItemStyle, ListStyle } from "../dragAndDrop/style"
import { LIST } from "../../constant";
import Header from '../header/index';
import { PROFILE_DETAILS, REGEX } from '../../constant';

function Profile() {
  const [list, setList] = useState(LIST);
  const [inputValue, setInputvalue] = useState({
    name: "",
    age: "",
    gender: ""
  })
  const hist = useHistory()
  
  useEffect(() => {
    let profileData = localStorage.getItem(PROFILE_DETAILS);
    if (profileData) {
      profileData = JSON.parse(localStorage.getItem(PROFILE_DETAILS));
      setInputvalue(profileData)
      setList(profileData.skills)
    }
  }, [])

  useEffect(() => {
    const { name, age, gender } = inputValue
    const data = {
      name: name,
      age: age,
      gender: gender,
      skills: list
    }
    localStorage.setItem(PROFILE_DETAILS, JSON.stringify(data))
  }, [inputValue, list])

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    console.log('name', name, value)
    switch(name) {
      case 'name': {
        if(REGEX.numCheck(value)) return;
      }
        break;
      case 'age': {
        if(isNaN(value)) return;
      }
        break;
    }
    setInputvalue({
      ...inputValue, [name]: value
    });
  }

  return (
    <>
      <Header history={hist} />
      <div className="main_profile">
        <div className="login_container">
          <form >
            <label>Name</label>
            <input className="form-input" type="text" autoComplete="off" name="name" value={inputValue.name} onChange={handleOnchange} pattern={/[a-zA-Z]+\\.?/} />
            <label>Age</label>
            <input className="form-input" type="text" name="age" value={inputValue.age} onChange={handleOnchange} pattern={/^\S[0-9]{0,3}$/} />
            <label>Gender</label>
            <select className="form-select-lg  bg-white mb-3" name="gender" value={inputValue.gender} onChange={handleOnchange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div>
              <label>Skills</label>
              <DragAndDrop list={list} itemStyle={ItemStyle} listStyle={ListStyle} updatedList={(ul) => setList(ul)} />
            </div>
          </form> 
        </div>
      </div>
    </>
  )
}

export default Profile
