import {Accordion, Badge, Button, Card} from 'react-bootstrap'
import {React,useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'

import axios, {} from 'axios'
const MyNotes = () => {
    const [notes,setNotes]=useState([]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
        //   dispatch(deleteNoteAction(id));
        }
      };
    const fetchNotes = async ()=>{
        const {data}=await axios.get("/api/notes");
        setNotes(data);

    };
    console.log(notes);
      useEffect(() => {
          fetchNotes();
      }, [])
    return (
        <div>
            <MainScreen title="welcome back jk..">
                <Link to='createnote'>
                    <Button style={{marginLeft:10,marginBottom: 6}} size="lg">
                        Create New Note
                    </Button>
                </Link>
        
        {
        notes.map(note=> (
        <Accordion>
  <Accordion.Item eventKey={note._id}>
    <Accordion.Header><span
      style={{
          color:'black',
          textDecoration:'none',
          flex:1,
          curusor:'pointer',
          alignSelf:'center',
          fontSize:18,
      }}
      >{note.title}</span>
      <div>
      <Button href={`/note/${note._id}`}>Edit</Button>
        <Button
            variant="danger"
            className="mx-2"
            onClick={() => deleteHandler(note._id)}
        >
            Delete
        </Button>
      </div>
      </Accordion.Header>
    <Accordion.Body>
    <h4>
          <Badge variant='success' className='badge bg-success' >Category-{note.category}</Badge>
      </h4>
    <blockquote className="blockquote mb-0">
      <p>
        {note.content}
      </p>
      <footer className="blockquote-footer">
        Created on-SomeDate
      </footer>
    </blockquote>
    </Accordion.Body>
  </Accordion.Item>
  
</Accordion>
        ))}
            </MainScreen>
           
        </div>
    )
}

export default MyNotes
