import React, { useContext, useEffect } from 'react'
import noteContext from '../contexts/noteContext'

export default function About() {
    const a = useContext(noteContext);
    useEffect(()=>{a.update()},[])
  return (
    <div>
      <h2>This is about note with title : {a.state.title} and description : {a.state.description}</h2>
    </div>
  )
}
