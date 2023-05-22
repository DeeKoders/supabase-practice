import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createClient } from "@supabase/supabase-js";

function TodoPage() {
  const supabase = createClient(
    "https://mfbwdscikclnwzphjpzy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndkc2Npa2Nsbnd6cGhqcHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NTk0MzAsImV4cCI6MjAwMDIzNTQzMH0.-xTsslnKV0Nwvl4ZMI0Ys5eZBR3VSeHGEoHBNSDD04U"
  );
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [{ title, description }, setAddTodo] = useState({});
  useEffect(() => {
    getTodos();
  }, []);

  const onInputChange = (e) => {
    if (e.target.name === "title") {
      setAddTodo((currentState) => ({
        ...currentState,
        title: e.target.value,
      }));
    } else if (e.target.name === "description") {
      setAddTodo((currentState) => ({
        ...currentState,
        description: e.target.value,
      }));
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const getTodos = async () => {
    setLoading(true);
    const { data } = await supabase.from("todo_notes").select();
    setTodos(data);
    setLoading(false);
  };
  const addTodos = async () => {
    setLoading(true);
    const { error } = await supabase.functions.invoke("add-todo-item-new", {
      body: { title, description },
    });
    setLoading(false);
    if (!error) {
      toggleModal();
      getTodos();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("todo_notes").delete().eq("id", id);
    setLoading(false);
    if (!error) {
      getTodos();
    }
  };
  if (loading)
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <h2 className="text-center">Loading...</h2>
          </Col>
        </Row>
      </Container>
    );
  return (
    <Container className="py-4">
      {console.log(todos)}
      <div className="text-center mb-4 mx-3">
        <h1>Todo Notes</h1>
        <Button variant="danger" onClick={() => toggleModal()}>
          Add Notes
        </Button>
      </div>
      <Row>
        {todos.map((todo) => (
          <Col md={4} key={todo.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{`Title: ${todo.title}`}</Card.Title>
                <Card.Text>{`Todo: ${todo.description}`}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Todo Notes</ModalHeader>
        <ModalBody>
          <Input
            title="Title"
            name={"title"}
            placeholder={"Please Enter Title"}
            onChange={onInputChange}
          />
          <Input
            className="mt-2"
            title="Description"
            name={"description"}
            placeholder={"Please Enter Description"}
            onChange={onInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color={"primary"} onClick={addTodos}>
            Add
          </Button>
          <Button color={"secondary"} onClick={toggleModal}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default TodoPage;
