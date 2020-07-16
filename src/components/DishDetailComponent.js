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
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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

function RenderComments({comments, addComment, dishId}){

    if(comments != null){

        const allcomment = comments.map((comm) => {
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
            <div className="col-12 col-md-5 mt-1">
                <h2>Comments</h2>
                {allcomment}
                <CommentForm addComment={addComment} dishId={dishId} />    
            </div>
        )
    }
    else{
        return(
            <div></div>
        );
    }
}

function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 mt-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const DishDetail = (props) => {
        

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
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id} />
                    </div>
                </div>
            );
        
        
    };


export default DishDetail;