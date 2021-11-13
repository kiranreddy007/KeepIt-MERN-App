import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listNotes, deleteNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, successDelete, successCreate]);
  return (
    <div>
      <MainScreen title={`welcome back ${userInfo.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion>
              <Accordion.Item eventKey={note._id}>
                <Accordion.Header>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      curusor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    {note.title}
                  </span>
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
                    <Badge variant="success" className="badge bg-success">
                      Category-{note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on {note.createdAt.substring(0, 10)}
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
