import React, {Component} from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody , BreadcrumbItem, Breadcrumb, Button, ModalHeader, Modal, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
    
const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalopen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal(){
        this.setState({
            isModalopen: !this.state.isModalopen
        })
    }
    
    handleSubmit(values){
        console.log("Current state is: "+ JSON.stringify(values));
        alert("Current state is: "+ JSON.stringify(values));
    }

    render(){
        return(
            <>
                <div className="container">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg" />{' '}Submit Comment
                    </Button> 
                </div>
                
                <Modal isOpen={this.state.isModalopen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={{ size: 12 }}>
                                    <Control.select model=".rating" name="rating"
                                            className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                        required: "Required. ",
                                        minLength: "Must be greater than 2 characters. ",
                                        maxLength: "Must be 15 characters or less. "
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows={6}
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    };
}



const DishDetail = (props) => {
        if(props.dish != null){

            const allcomment = props.comments.map((comm) => {
                return(
                    <div className="container">
                    <div key={comm.id}>
                        <p>{comm.comment}</p>
                        <p>--{comm.author},   {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                    </div>
                    </div>
                );
            }); 

            return(
                <div className="container">
                    <div className="row" >
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 mt-1">
                            <Card>
                                <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                                <CardBody>
                                    <CardTitle>{props.dish.name}</CardTitle>
                                    <CardText>{props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 mt-1">
                            <h2>Comments</h2>
                            {allcomment}
                            <CommentForm />
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    };


export default DishDetail;