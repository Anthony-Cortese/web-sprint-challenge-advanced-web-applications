import React, { useState } from "react";
import axios from "axios";
import Color from './Color'
import EditMenu from './EditMenu'
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import { useParams } from "react-router";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit )
    .then(res => {
      console.log('res:', res)
      updateColors([...colors, res.data])
    })
    .catch(err => {
			console.log('err:', err)
		})
    

  };

  const deleteColors = (id) => {
    updateColors(colors.filter(item=> (item.id !== Number(id))))
  }

  const deleteColor = color => {
    console.log("color in DC:", color)
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then( res => {
      console.log('Delete:', res)
      deleteColors(res.data)
    })
    .catch(err => {
      console.log({'Delete:': err})
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.